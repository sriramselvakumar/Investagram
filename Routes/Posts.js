const express = require("express");
const router = express.Router();
const isImageUrl = require('is-image-url');
const AuthInvestor = require('../Middleware/Authentication')
const Post = require('../Models/PostModel')
const Investor = require('../Models/InvestorModel')

router.post('/createPost',AuthInvestor, async (req, res) => {
    let {title,description,imageLink} = req.body;
    imageLink = imageLink.replace(/\s+/g, '')
    let validImage = true
    if(imageLink.length !== 0) validImage = await isImageUrl(imageLink)
    if(!validImage) return res.send({valid: false, validImage, post:{} })
    let post = new Post( {
        title,
        description,
        imageLink,
        comments: [],
        likes: [],
        authorID: req.user.id,
    })
    post = await post.save()
    const {comments,likes} = post
    post = {
        title,
        description,
        imageLink,
        comments,
        likes,
        authorName: 'By You',
    }
    return res.send({valid: true, validImage, post})
})

router.put('/putComment', AuthInvestor, async(req,res) => {
    const {postID, description} = req.body;
    let post = await Post.findById(postID)
    let commentList = [...post.comments]
    commentList.push({user_id: req.user.id, comment: description})
    post.comments = [...commentList]
    await post.save()
})

router.put('/updateLiked', AuthInvestor, async(req, res) => {
    const {postID, liked} = req.body
    let post = await Post.findById(postID)
    let likeList = []
    if(!liked){
        for (let i  =0 ; i < post.likes.length; i++) {
            if(post.likes[i]!==req.user.id) likeList.push(post.likes[i])
        }
    }
    else {
        likeList = [...post.likes]
        likeList.push(req.user.id)
    }

    post.likes = [...likeList]
    await post.save()
})

router.delete('/deletePost/:postID' , AuthInvestor, async(req,res) => {
    const {postID} = req.params 
    await Post.deleteOne({_id: postID})
})


router.get('/getPosts/:user', AuthInvestor, async(req, res) => {

    let allPosts = null
    if(req.params.user === 'false') allPosts = await Post.find()
    else if (req.params.user === 'true') allPosts = await Post.find({authorID: req.user.id})
    let posts = [] 
    for(let a = 0;a < allPosts.length;a++){
        const {imageLink,description,title,likes,authorID,_id} = allPosts[a]
        let authorName = 'By '
        if(authorID === req.user.id) authorName += 'You'
        else{
            const {firstName,lastName} = await Investor.findById(authorID)
            authorName += firstName + ' ' + lastName
        }
        let comments = []
        const commentList = allPosts[a].comments
        for(let b = 0; b < commentList.length;b++){
            const {user_id,comment} = commentList[b]
            let by = 'By '
            if(user_id === req.user.id) by += 'You'
            else{
                const { firstName,lastName} = await Investor.findById(user_id) 
                by += firstName + ' ' + lastName
            }
            comments.push({by,comment})
        }
        posts.push(
            {
                imageLink,
                description,
                title,
                likes,
                comments,
                authorName,
                postID: _id,
                currentUser: req.user.id,
            }
        )
    }
    return res.send({valid: true,posts})
})

module.exports = router;