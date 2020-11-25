
const express = require("express");
const router = express.Router();
const Investor = require('../Models/InvestorModel')
const bcrypt = require("bcrypt");
const isImageUrl = require('is-image-url');
const sgmail = require('@sendgrid/mail')
require('dotenv').config()

router.post('/registerInvestor',async(req, res) => {
    const {firstName, lastName,email, password,profileImg} = req.body
    let validImage = true
    if(profileImg.length > 0) validImage = await isImageUrl(profileImg)
    let validEmail = true
    let investor = await Investor.findOne({email})
    if(investor) validEmail = false
    if(!validImage || !validEmail){
        return res.status(200).send({
            userCreated: false,
            validImage,
            validEmail,
            token: 'empty'
        })
    }
    investor = new Investor({
        firstName,
        email,
        lastName,
        password,
        profileImg,
    })
    try {
        sgmail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email,
            from: 'sriram.selvakumar@outlook.com',
            subject: `Hey ${firstName} ${lastName}, you have registered for Investagram`,
            text: 'We really hope that you learn investing tips from great investagrammers around the world :)',
            html: '<strong>We really hope that you learn investing tips from great investagrammers around the world :)</strong>',
        }
        try {
            await sgmail.send(msg)     
        } catch (error) {
            console.error(error)
        }
        const salt = await bcrypt.genSalt(10);
        investor.password = await bcrypt.hash(investor.password,salt)
        await investor.save()
        
        const token = investor.generateJWT()
        return res.header('x-auth-token').send(
            {token,userCreated: true, validImage, validEmail}
        ).status(200)
    }
    catch (err) {
        return res.status(200).send({userCreated: false, validImage,validEmail,token: 'empty',err})
    }

})

module.exports = router