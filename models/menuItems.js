const mongoose = require('mongoose');

const menuItem = new mongoose.Schema({
    Name: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['spicy','sweet','sour'],
        required:true
    },
    is_dring:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String]
    }   
});

const menuItems = mongoose.model('menuItem',menuItem);

module.exports = menuItems;