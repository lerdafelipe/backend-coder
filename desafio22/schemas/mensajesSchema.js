const {Schema, model} = require('mongoose');

const {normilize, schema} = require('normalizr');

const schemaAuthor = new schema.Entity('author');

const schemaMensaje = new schema.Entity('mensaje',{
    author: schemaAuthor
});

const mensajesSchema = new Schema({
    mensaje: String
}, {versionKey: false});

module.exports = model('mensajes', mensajesSchema);