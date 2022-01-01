const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    img: {
        type: String,
        default: ""
    },
    imgTitle: {
        type: String,
        default: ""
    },
    imgThumbnail: {
        type: String,
        default: ""
    },
    trailer: {
        type: String
    },
    video: {
        type: String
    },
    year: {
        type: String
    },
    ageLimit: {
        type: Number
    },
    genre: {
        type: String
    },
    isSeries: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Movie", MovieSchema);