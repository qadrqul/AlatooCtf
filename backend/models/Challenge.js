const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
    competition: {
        type: Schema.Types.ObjectId,
        ref: 'Competition',
    },
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    category: {
        type: String,
        required: true,
        enum: ["Codebreakers", "First-Timers"],
        default: "First-Timers",
    },
    description: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 99,
    },
    type: {
        type: String,
        required: true,
        enum: ["Practice", "Competition"],
        default: "Practice",
    },
    file: String,
    result: {
        type: String,
        required: true,
        maxLength: 50,
    },
    hint1: {
        type: String,
        required: false,
    },
    hint2: {
        type: String,
        required: false,
    },
    hint3: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;
