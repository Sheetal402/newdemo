const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {Users} = require("../database/models/users");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    console.log("authhedssssssss.");

    let user = await Users.findOne({email: req.body.email});

    if(user) {
        const id = user._id;
        console.log("1234 id = ",id);
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(validPassword) {
            const token = user.generateAuthToken();
            // res.cookie("jwttoken", token);
            res.status(200)
            res.send({token}); 
        } else {
            console.log("123 Invalid Password");
            return res.status(400).send('Invalid Password');
        }
    } else {
        console.log("123 Invalid Email Id");
        return res.status(400).send('Invalid Email');
    }
});

module.exports = router;