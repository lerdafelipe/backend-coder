const {Schema, model} = require('mongoose');

const users = new Schema({
    id: String,
    first_name: String,
    last_name: String,
    picture: String,
    email: String
}, {versionKey: false});

module.exports = model('users', users);