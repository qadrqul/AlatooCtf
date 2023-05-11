const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const path = require('path');
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const Challenge = require("../models/Challenge");
const User = require("../models/User");
const Competition = require("../models/Competition");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', auth, async (req, res) => {
    try {
        const {category, title, type, competition} = req.query;
        const query = {};

        if (category) query.category = category;
        if (type) query.type = type;
        if (competition) query.competition = competition;
        if (title) query.title = {$regex: title, $options: 'i'};


        if (type && competition) {
            const comp = await Competition.findById(competition);

            if (!comp.isStarted && req.user.role === "team") {
                return res.status(403).send({message: "You're dont have rights!"});
            }
        }

        const challenges = await Challenge.find(query).sort({createdAt: "desc"});
        res.send(challenges);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('file'), async (req, res) => {
        try {
            const {competition, title, category, description, points, type, result, hint1, hint2, hint3} = req.body;

            const challengeData = {
                title,
                category,
                description,
                points,
                type: type || "Practice",
                file: null,
                result,
                hint1,
                hint2,
                hint3
            };

            if (competition) challengeData.competition = competition;

            if (req.file) {
                challengeData.file = 'uploads/' + req.file.filename;
            }

            const newChallenge = new Challenge(challengeData);
            await newChallenge.save();

            res.send(newChallenge);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

router.post('/:id', auth, async (req, res) => {
        try {
            const {result} = req.body;
            const {_id} = req.user;

            const user = await User.findById(_id);
            const challenge = await Challenge.findById(req.params.id);

            if (!challenge) {
                return res.status(404).send({message: "Challenge not found"});
            }

            if (challenge.result !== result) {
                return res.send({error: "Wrong answer!"});
            }

            const challengeIdString = challenge._id.toString();
            const hasSolved = user.solvedPracticeChallenges.includes(challengeIdString);

            if (!hasSolved && challenge.type === "Practice") {
                user.practicePoints += challenge.points;
                user.solvedPracticeChallenges.push(challenge._id);
                await user.save({validateBeforeSave: false});

                return res.send({
                    message: "Congratulations! Your answer is correct!",
                    points: challenge.points,
                    challengeId: challenge._id
                });
            }

            if (!hasSolved && challenge.type === "Competition") {
                user.solvedPracticeChallenges.push(challenge._id);

                const competition = await Competition.findById(challenge.competition);
                const title = competition.title;

                const idxCompetition = user.competitionsPoints.findIndex(c => c.title === competition.title);

                if (idxCompetition < 0) {
                    user.competitionsPoints.push({title, points: challenge.points});
                } else {
                    user.competitionsPoints[idxCompetition].points += challenge.points;
                }

                user.save({validateBeforeSave: false});
                return res.send({
                    message: "Congratulations! Your answer is correct!",
                    challengeId: challenge._id
                });
            }

            res.send({
                message: "Congratulations! Your answer is correct!",
                points: 0
            });
        } catch (e) {
            console.log(e);
            return res.status(400).send(e.message);
        }
    }
);

router.put('/:id', auth, permit('admin'), upload.single('file'), async (req, res) => {
        try {
            const {competition, title, category, description, points, type, result, hint1, hint2, hint3} = req.body;

            const challengeData = {
                competition,
                title,
                category,
                description,
                points,
                type: type || "Practice",
                file: null,
                result,
                hint1,
                hint2,
                hint3
            };

            if (req.file) {
                challengeData.file = 'uploads/' + req.file.filename;
            }

            const updateChallenge = await Challenge.findByIdAndUpdate(
                req.params.id,
                challengeData
            );

            res.send(updateChallenge);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {
            return res.status(404).send({message: 'Challenge not found!'});
        }

        await Challenge.deleteOne(challenge);
        res.send({message: 'Challenge deleted successfully!'});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;