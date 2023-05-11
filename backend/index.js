require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const config = require('./config');

const users = require('./app/users');
const challenges = require('./app/challenges');
const competitions = require('./app/competitions');
const banners = require('./app/banners');

const app = express();
const port = 8000;

mongoose.set('strictQuery', false);
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/challenges', challenges);
app.use('/competitions', competitions);
app.use('/banners', banners);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('MongoDb disconnect');
    });
};

run().catch(e => console.log(e));