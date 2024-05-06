require('dotenv').config(); // Load environment variables from .env file

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://angelslovley:qdXa0ra5BmPwWo70@cluster0.xmdaz3a.mongodb.net/collab");

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongo db connected successfully');
})

connection.on('error', (err) => {
    console.log('Mongo db connection error: ', err);
})

module.exports = mongoose;