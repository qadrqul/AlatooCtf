const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const Competition = require("../models/Competition");

router.get('/', auth, async (req, res) => {
    try {
        const competitions = await Competition.find().sort({createdAt: "desc"});
        res.send(competitions);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const competition = await Competition.findById(req.params.id);

        if (!competition.isStarted && req.user.role === "team") {
            return res.status(403).send({message: "You're dont have rights!"})
        }

        res.send(competition);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, permit('admin'), async (req, res) => {
        try {
            const {title, maxTeams} = req.body;

            const competitionData = {
                title,
                maxTeams
            };

            const newCompetition = new Competition(competitionData);
            await newCompetition.save();

            res.send(newCompetition);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

router.post('/:password', auth, async (req, res) => {
        try {
            const { password } = req.params;

           const competition = await Competition.findOne({password});

           if (!competition || !competition.isStarted) {
               return res.status(404).send({message: "Wrong password or the competition hasn't started yet"});
           }

           if (competition && competition.isStarted) {
               return res.send({
                   message: "You have successfully logged the competition!",
                   id: competition._id
               });
           }
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

router.put('/:id', auth, permit('admin'), async (req, res) => {
        try {
            const {title, isStarted, password} = req.body;

            const challengeData = {title};

            if (typeof isStarted === "boolean") challengeData.isStarted = isStarted;
            if (password) challengeData.password = password;

            const updateCompetition = await Competition.findByIdAndUpdate(req.params.id, challengeData);

            if (isStarted && password) {
                return res.send({message: "Competition started!", isStarted: Boolean(isStarted)});
            } else if (typeof isStarted === "boolean") {
                return res.send({message: "Competition ended!", isStarted: Boolean(isStarted)});
            }

            res.send(updateCompetition);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);
//
// router.delete('/:id', auth, permit('admin'), async (req, res) => {
//     try {
//         const challenge = await Challenge.findById(req.params.id);
//
//         if (!challenge) {
//             return res.status(404).send({ message: 'Challenge not found!' });
//         }
//
//         await Challenge.deleteOne(challenge);
//         res.send({ message: 'Challenge deleted successfully!' });
//     } catch (e) {
//         res.status(400).send(e);
//     }
// });

module.exports = router;