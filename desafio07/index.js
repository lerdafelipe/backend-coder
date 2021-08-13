const express = require('express');

const app = express();

const puerto = 8080;

app.get('/', (req, res) => {
    console.log('request recibido!');
    res.json({ msg: 'hola mundo!' });
});

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});