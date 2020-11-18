const mongoose = require('mongoose');
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 9,
    },
    posts: [{type: String}]

})