const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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
app.listen(port, () => {
    console.log(`Server running on port ${port} `);
});