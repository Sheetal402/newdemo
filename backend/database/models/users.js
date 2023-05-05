const envConfig = require('../config/custom-environment-variables.json');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lname: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    address: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    profilepic: {
        // data: Buffer,   
        type: String,
        // contentType : String
    },
    contact: {
        type: Number,
        trim: true,
        minlength:10
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength:8,
        maxlength: 1024
    }
});

usersSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, envConfig.jwtPrivateKey, {expiresIn: '24h'});
    return token;
}

const Users = mongoose.model('users', usersSchema);

exports.Users = Users;
