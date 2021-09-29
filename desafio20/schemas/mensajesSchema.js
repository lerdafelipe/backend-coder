const {Schema, model} = require('mongoose');

const mensajesSchema = new Schema({
    mensaje: String
}, {versionKey: false});

module.exports = model('mensajes', mensajesSchema);