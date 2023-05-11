const express = require('express');
const router = express.Router();
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middlewares/auth");
const Banner = require("../models/Banner");
const permit = require("../middlewares/permit");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const banner = await Banner.find();
        res.send(banner[0]);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {
        try {
            const { text } = req.body;

            const bannerData = {
                text,
                image: null,
            };

            if (req.file) {
                bannerData.image = 'uploads/' + req.file.filename;
            }

            const banner = await Banner.find();

            if (!banner.length) {
                const newBanner = new Banner(bannerData);
                await newBanner.save();

                res.send(newBanner);
            } else {
                const updateBanner = await Banner.findByIdAndUpdate(
                    banner[0]._id,
                    bannerData
                );

                res.send(updateBanner);
            }
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

module.exports = router;