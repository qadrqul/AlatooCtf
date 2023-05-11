const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const Schema = mongoose.Schema;

const CompetitionSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    maxTeams: {
        type: Number,
        required: true,
        min: 1,
        max: 99,
        default: 1,
    },
    password: {
        type: String,
        required: true,
        default: nanoid(),
    },
    isStarted: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

const Competition = mongoose.model('Competition', CompetitionSchema);

module.exports = Competition;
