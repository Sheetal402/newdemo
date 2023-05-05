const auth = require('../middleware/auth');
const imageUpload = require("../middleware/imageUpload");
const config = require('config');
const jwt = require('jsonwebtoken');
const envConfig = require('../database/config/custom-environment-variables.json');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Users} = require("../database/models/users");
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "img/")
        },
        filename: function(req, file, cb){
            cb(null, file.fieldname + "-" + Date.now() + ".png")
        }
    })
}).single('profilepic')

//get or read
router.get('/', (req, res) => {
    Users.find({})
        .then(data => res.send(data))
        .catch((error) => console.log(error));
});

router.get('/',(req,res) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
        Users.count({},function(err,totalCount) {
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"}
            }
            Users.find({},{},query,function(err,data) {
                // Mongo command to fetch all data from collection.
              if(err) {
                  response = {"error" : true,"message" : "Error fetching data"};
              } else {
                  var totalPages = Math.ceil(totalCount / size)
                  response = {"error" : false,"message" : data,"pages": totalPages};
              }
              res.json(response);
            });
        })
})

//post or write
// router.post(route, middleware(optional), actual route handler)

router.post('/', upload, async (req, res) => {
    console.log("****",req.file.filename);
    // console.log("@@@",req.body.profilepic);

    let user = await Users.findOne({email: req.body.email});
    
    if(user) return res.status(400).send('User already registered...')

        user = new Users({
            fname: req.body.fname,
            lname: req.body.lname,
            address: req.body.address,
            profilepic: 'img/'+req.file.filename,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
        })

        console.log("user in user's post = ",user.profilepic);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        
        await user.save();

        const token = user.generateAuthToken();
        res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(_.pick(user, ["_id", "name", "email"]));
});

//get one or read one
router.get('/me', auth, async (req, res) => {
    const user = await Users.findById(req.user._id);
    res.send(user);
})

//patch or update 
router.patch('/:_id', upload, (req, res) => {
    const updateData = Object.assign({},req.body); // Copy req.body in order not to change it
    console.log("!!!req.file.filename",req.file.filename);

    updateData.profilepic = 'img/'+req.file.filename; 
    
    console.log("!!!", updateData);

    Users.findOneAndUpdate({_id: req.params._id}, updateData)
    .then((data) => {res.send(data);})
    .catch((error) => console.log("error in upload",error));
})

//delete
router.delete('/:_id', (req, res) => {
    Users.findByIdAndDelete({_id:req.params._id})
    .then((data) => res.send(data))
    .catch((error) => console.log("from user routes",error));
})

module.exports = router;