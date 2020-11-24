const jwt = require("jsonwebtoken");
const Investor = require('../Models/InvestorModel')

require('dotenv').config()

async function authInvestor(req,res,next){
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(400).send("Invalid token");
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const investor = await Investor.findById(payload.id);
        if (!investor) return res.status(400).send("Invalid token");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send("Invalid token");
    }
}

module.exports = authInvestor