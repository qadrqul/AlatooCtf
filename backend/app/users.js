const express = require('express');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
// const transporter = require("../service/transporter");
// const jwt = require('jsonwebtoken');
// const {nanoid} = require("nanoid");
const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET;

router.get('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/',  async (req, res) => {
    try {
        const sort = {};

        if (req.query.filter) {
            sort.practicePoints = "desc";
        }

        const user = await User.find().sort(sort);
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});



router.post('/', async (req, res) => {
    const {users, teamName, password, email} = req.body;

    try {
        let userData = {users, teamName, password, email};

        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res
            .status(401)
            .send({error: 'Invalid login or password!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res
            .status(401)
            .send({error: 'Invalid login or password!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({message: 'Successful login!', user});
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});

router.delete('/:id', auth, permit("admin"), async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).send({ message: 'User not found!' });
    }

    await User.deleteOne(user);
    res.send({ message: 'User deleted successfully!' });
});

// router.post('/forgot-password', async (req, res) => {
//     const {email} = req.body;
//
//     try {
//         const user = await User.findOne({email});
//
//         if (!user) {
//             return res
//                 .status(404)
//                 .send({message: 'Пользователь с данной почтой не найден.'});
//         }
//
//         const secret = JWT_SECRET + user.password;
//
//         const payload = {
//             email: user.email,
//             id: user._id,
//         };
//
//         const token = jwt.sign(payload, secret, {expiresIn: '10m'});
//
//         transporter.sendResetPasswordLink(user._id, token, email);
//
//         res.send('Ссылка для сброса пароля была отправлена на почту: ' + email);
//     } catch (e) {
//         res.status(401).send(e);
//     }
// });
//
// router.post('/reset-password/:id/:token', async (req, res) => {
//     const {id, token} = req.params;
//     const {password, password1} = req.body;
//
//     try {
//         const user = await User.findById(id);
//
//         if (!user) {
//             return res.status(404).send({error: 'Пользователь не найден.'});
//         }
//
//         if (password !== password1) {
//             return res.status(400).send({message: 'Пароли не совпадают!'});
//         }
//
//         const secret = JWT_SECRET + user.password;
//
//         jwt.verify(token, secret);
//
//         user.password = password;
//         await user.save({validateBeforeSave: false});
//
//         res.send({message: 'Пароль успешно изменен!'});
//     } catch (e) {
//         res.status(404).send(e);
//     }
// });

module.exports = router;
