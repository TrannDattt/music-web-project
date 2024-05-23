const mongoose = require("mongoose")
const album = require("./album")
const artist = require("./artist")

const songSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    songURL: {
        type: String,
        required: true,
    },
    albumId: {
        type: String,
    },
    albumName: {
        type: String,
    },
    artistId: {
        type: String,
        required: true,
    },
    artistName: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    viewCount: {
        type: Number,
        required: true,
        default: 0,
    },
    likeCount: {
        type: Number,
        required: true,
        default: 0,
    },
}, {timestamps: true}
)

module.exports = mongoose.model("song", songSchema)