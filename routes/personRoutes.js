const express = require('express');
const router = express.Router();
const person = require('../models/person');



//person get request
router.get('/', async (req, res) => {
    
    try {
        const data = await person.find();
        res.status(200).json(data);
    }
    catch (err) {
        console.log("internal error");
        res.status(500).json("internal server error");
    }
})

//person get request with work type

router.get('/:workType', async (req, res) => {
    
    try {
        const workType = req.params.workType

        if(workType=="chef" || workType=="manager" ||workType=="waiter"){

            const data = await person.find({ work: workType });
            res.status(200).json(data);
        }else{
            res.status(404).json("invalid work type");

        }
        
    }
    catch (err) {
        console.log("internal error");
        res.status(500).json("internal server error");
    }
})

//person post request
router.post('/', async (req, res) => {
    try {
        const data = await req.body;
        const newperson = await new person(data);
        const savedPerson = await newperson.save();
        res.status(200).json(newperson);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:"internal error"});
    }
})


router.put('/:id',async (req,res)=>{
    
    try{

        const personId = req.params.id;
        const newDataToBeUpdated = req.body;    
        const response = await person.findByIdAndUpdate(personId,newDataToBeUpdated,{
            new:true,
            runValidators:true
        });

        if(!response){
            return res.status(404).json({Error:"person not found"});
        }
        
        console.log("person data updated");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:"internal error"});
    }
});


router.delete('/:id', async (req,res)=>{

    try{
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        
        if(!response){
            return res.status(404).json({Error:"person not found"});
        }
        console.log("person data deleted");
        res.status(200).json({response:"person data deleted succesfully"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:"internal error"});
    }

});

    


module.exports = router;