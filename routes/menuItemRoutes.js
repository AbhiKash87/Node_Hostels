const express = require('express');
const router = express.Router();
const menuItems = require('../models/menuItems');

//menu items get request

router.get('/', async (req, res) => {

    try {
        const data = await menuItems.find();
        console.log("Menu items Fetched");
        res.status(200).json(data);
    }
    catch (err) {
        console.log("internal error");
        res.status(500).json("internal server error");
    }
})


//menuItems post Request
router.post('/', async (req, res) => {
    try {
        const data = await req.body;
        const newMenuItem = await new menuItems(data);
        const newMenuItemsaved = await newMenuItem.save();
        console.log(data);
        res.status(200).json(data);
    }
    catch (err) {
        console.log("internal error");
        res.status(500).json("internal server error");
    }
})

module.exports = router;