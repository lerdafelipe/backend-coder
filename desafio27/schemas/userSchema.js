const {Schema, model} = require('mongoose');

const users = new Schema({
    username: String,
    password: String
}, {versionKey: false});

module.exports = model('users', users);