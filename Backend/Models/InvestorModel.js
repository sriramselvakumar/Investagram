const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require('dotenv').config()

const InvestorSchema = new mongoose.Schema({
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
    firstName: {type: String,required: true},
    lastName: {type: String, required: true},
    profileImg: {type: String},
    
})

InvestorSchema.methods.generateJWT = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    return token;
}
const Investor = mongoose.model('Investor',InvestorSchema)


module.exports = Investor