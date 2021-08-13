const express = require('express');
const fs = require('fs');

const app = express();

const puerto = 8080;

let visitaItems = 0;
let VisitaRandom = 0;

function randomNum(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

//Ruta visitas
app.get('/visitas', (req, res) => {
    res.json({ items: visitaItems, Item: VisitaRandom});
});

//Ruta items
app.get('/items', (req, res) => {
    visitaItems++;
    fs.promises.readFile('./productos.txt', 'utf-8')
    .then(data => JSON.parse(data))
    .then(datos => res.json({items: datos, cantidad: datos.length}));
});

//Ruta item random
app.get('/item-random', (req, res) => {
    VisitaRandom++;
    fs.promises.readFile('./productos.txt', 'utf-8')
    .then(data => JSON.parse(data))
    .then(datos => res.json({item: datos[randomNum(0, datos.length-1)]}));
});

//
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


//Error en servidor
server.on('error', error => {
    console.log('error en el servidor:', error);
});