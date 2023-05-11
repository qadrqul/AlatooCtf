const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    image: String,
    text: String,
});

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
