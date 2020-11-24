const express = require("express");
const router = express.Router();
const Investor = require('../Models/InvestorModel')
const AuthInvestor = require('../Middleware/Authentication')

router.get('/getUser',AuthInvestor ,async (req, res) => {
    const investor = await Investor.findById(req.user.id)
    if(investor) return res.status(200).send({valid: true, investor})
    else return res.status(400).send({valid: false, investor})
})





module.exports = router