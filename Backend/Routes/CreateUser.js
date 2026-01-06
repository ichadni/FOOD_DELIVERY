const {response} = require('express');
const express = require('express');
const User = require('../models/user');
const user = require('../models/user');
const router = express.Router();

router.post('/createuser', async (req, res) => {
    try {
       await user.create({

            name:req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location
            
        })
        res.json({success: true});
    }catch (error) {
        res.json({success: false});
    }

});
module.exports = router;