const express = require("express");
const router = express.Router();
const Investor = require('../Models/InvestorModel')
const bcrypt = require("bcrypt");

router.post('/loginInvestor', async(req,res) => {
    const {email,password}  =req.body
    investor = await Investor.findOne({email})
    if(!investor) return res.send({loggedIn: false, token: 'empty'})
    const isValidUser = await bcrypt.compare(password,investor.password)
    if(!isValidUser) return res.send({loggedIn: false, token: 'empty'})
    const token = investor.generateJWT()
    return res.header('x-auth-token',token).send({loggedIn: true, token})
})

module.exports = router