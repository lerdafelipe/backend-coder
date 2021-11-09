const {Schema, model} = require('mongoose');

const mensajesSchema = new Schema({
    author: Object,
    mensaje: String
}, {versionKey: false});

module.exports = model('mensajes', mensajesSchema);