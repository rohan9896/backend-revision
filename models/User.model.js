const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://github.com/rohan9896/Testing-for-CSS-component-library/blob/main/icons/avatar%20component/avatarUser.svg"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);