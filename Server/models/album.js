const mongoose = require("mongoose")

const albumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
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
    viewCount: {
        type: Number,
        required: true,
        default: 0,
    },
}, {timestamps: true}
)

module.exports = mongoose.model("album", albumSchema)