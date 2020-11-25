const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    authorID: {type: String, required: true},
    comments: [{type: Object}],
    likes: [{type: String}],
    description: {type: String},
    title: {type: String, required: true},
    imageLink: {type: String, default: ''}

})

const Post = mongoose.model('Post',PostSchema)

module.exports = Post
