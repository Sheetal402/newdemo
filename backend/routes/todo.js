// const auth = require('../middleware/auth');
// const config = require('config');
// const jwt = require('jsonwebtoken');
// const envConfig = require('../database/config/custom-environment-variables.json');
// const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Todo} = require("../database/models/todo");
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    Todo.find({})
        .then(data => res.send(data))
        .catch((error) => console.log(error));
});

router.get('/search/:searchTerm', (req, res) => {
    var searchTerm = req.params.searchTerm;
    // console.log("searchTerm = ", searchTerm.length);
    
    if(searchTerm.length>=3){
        var query = {$text: {$search: searchTerm}};
        return Todo.find(query,{_id:0});    
    }
    return; 
});

router.post('/', async (req, res) => {
    console.log("****",req.body);
    todo = new Todo(_.pick(req.body, ['content']));    
    await todo.save();
    res.send()
});

router.patch('/:_id', (req, res) => {
    console.log("!!!",req.params._id);
    Todo.findOneAndUpdate({_id: req.params._id}, {$set: req.body})
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
})

router.delete('/:_id', (req, res) => {
    console.log("$$$ req.param._id = ",req.params._id)
    Todo.findByIdAndDelete({_id:req.params._id})
    .then((data) => res.send(data))
    .catch((error) => console.log("from comment routes",error));
})

module.exports = router;

