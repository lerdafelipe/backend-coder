//express
const express = require('express');
//App en express
const app = express();

let productos = [
    {id: 1, title: 'Azúcar', price: 325, thumbnail: 'img/azu'},
    {id: 2, title: 'yerba', price: 152, thumbnail: 'img/yer'},
    {id: 3, title: 'nesquik', price: 800, thumbnail: 'img/nes'},
    {id: 4, title: 'té', price: 986, thumbnail: 'img/te'},
];



app.get('/', (req, res)=>{

    res.render('index', {productos: productos});
});

app.set('views', './views');
//Pug
app.set('view engine', 'pug');
//Pug*/

///ejs
//app.set('view engine', 'ejs');
//ejs




//Ruta a productos
const products = require('./routes/productos.route');

//Ruta a productos
app.use('/productos', products);

//Uso del static
//app.use(express.static('public'));*/


//app en el Servidor
const server = app.listen(5300, ()=>{
    console.log(`Servidor escuchando puerto ${server.address().port}`);
});

//Manejo de error del servidor
server.on('error', error =>{
    console.log('Ha ocurrido un error en el servidor', error);
})