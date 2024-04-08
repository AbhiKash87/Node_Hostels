const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.DB_URL;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("MongoDb connected");
});
db.on("disconnected",()=>{
    console.log("MongoDb connected");
});
db.on("error",(err)=>{
    console.log("MongoDb server connection error: ",err);
});

module.exports = db;
