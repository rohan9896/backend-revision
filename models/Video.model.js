const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideoSchema = new Schema({
    thumbnail: {
        type: String,
        default: "https://picsum.photos/id/237/200/300",
    },
    title: {
        type: String,
        required: true,
    },
    videoLength: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
    channelImg: {
        type: String,
        default: "https://picsum.photos/id/237/200/300",
    },
    youtubeLink: {
        type: String,
        required: true,
        unique: true,
    },
    views: {
        type: Number,
        default: 0,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Video", VideoSchema);