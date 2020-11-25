const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Registration = require('./Routes/Registration')
const Login  = require('./Routes/Login')
const User = require('./Routes/Users')
const Post = require('./Routes/Posts')
const path = require('path')
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});



const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to MongoDB");
});

app.use('/api/register',Registration)
app.use('/api/login',Login)
app.use('/api/user',User)
app.use('/api/post',Post)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port} `);
});