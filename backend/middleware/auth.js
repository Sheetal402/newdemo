const jwt = require('jsonwebtoken');
const config = require('config');
const envConfig = require('../database/config/custom-environment-variables.json');

function auth(req, res, next) {
    // console.log(2222,"req.authorization", req.headers.authorization);
    
    const token = req.headers.authorization;
    
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, envConfig.jwtPrivateKey);
        // console.log(333,"decoded",decoded);
        req.user = decoded;
        next();
    } catch(ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;