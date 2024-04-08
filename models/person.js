const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required:true,
        unique: true
    },
    work:{
        type:String,
        enum:["chef","manager","waiter"]
    },
    address:{
        type:String,
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

personSchema.pre('save',async function(next){

    const person = this;
    if(!person.isModified("password")) return next();

    try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await  bcrypt.hash(person.password,salt);
            person.password = hashedPassword;
            next();

    }
    catch(err){
            return next(err);
    }   
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err
    }
}

const person = mongoose.model("person",personSchema);

module.exports = person;