const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/SMS')
    .then(() => console.log("Database connected"))
    .catch((e) => console.log("Could not connect to MongoDB : ",e));

module.exports = mongoose;