const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    work:{
        type:String,
        enum:["chef","manager","waiter"]
    },
    address:{
        type:String,
    }
})

const person = mongoose.model("person",personSchema);

module.exports = person;