const cors = require('cors');
const config = require('config');
const mongoose = require('./database/mongoose');

const users = require('./routes/users');
const auth = require("./routes/auth");
const todo = require("./routes/todo");
const bodyParser = require('body-parser'); 
const express = require('express');
const app = express();
const envConfig = require("./database/config/custom-environment-variables.json")

if(!envConfig.jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


// const Users = require("./database/models/users");
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.json());
app.use(cors());
app.use('/users', users);
app.use('/auth', auth);
app.use('/todo', todo);

app.use(express.static(__dirname + '/'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// PORT 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is connected on port ${port}...`));