const express = require('express');

const productos = [
    {id: 1, title: 'Azúcar', price: 325, thumbnail: 'img/azu'},
    {id: 2, title: 'yerba', price: 325, thumbnail: 'img/yer'},
    {id: 3, title: 'nesquik', price: 325, thumbnail: 'img/nes'},
    {id: 4, title: 'té', price: 325, thumbnail: 'img/te'},
];



const app = express();

app.get('/', (req, res)=>{
    res.send('Hola');
});

app.get('/api/productos/listar', (req, res)=>{
    if(productos.length > 0){
        res.json(productos);
    }else{
        res.json({error : 'no hay productos cargados'});
    }
});

app.get('/api/productos/listar/:id', (req, res)=>{
    let producto = productos.filter(prod => prod.id === parseInt(req.params.id));
    if(producto.length > 0){
        res.json(producto);
    }else{
        res.json({error : 'producto no encontrado'});
    }
});

app.post('/api/productos/guardar', (req, res)=>{
    let newProduct = {id: `${productos.length+1}`, title: 'vinagre', price: 325, thumbnail: 'img/vinagre'};
    productos.push(newProduct);
    res.json(newProduct);
});

const server = app.listen(5005, ()=>{
    console.log('Servidor escuchando en puesto 5005');
});

server.on('error', error =>{
    console.log('Ha ocurrido un error en el servidor', error);
})