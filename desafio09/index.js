//express
const express = require('express');

//App en express
const app = express();
//Router
//const router = express.Router();

//Ruta a productos
const products = require('./routes/productos.route');

//Ruta a productos
app.use('/productos', products);

//Uso del static
app.use(express.static('public'));

//app en el Servidor
const server = app.listen(5005, ()=>{
    console.log('Servidor escuchando en puesto 5005');
});

//Manejo de error del servidor
server.on('error', error =>{
    console.log('Ha ocurrido un error en el servidor', error);
})