const express = require('express');
//Router
const router = express.Router();


//Array de productos
const productos = [
    {id: 1, title: 'Azúcar', price: 325, thumbnail: 'img/azu'},
    {id: 2, title: 'yerba', price: 325, thumbnail: 'img/yer'},
    {id: 3, title: 'nesquik', price: 325, thumbnail: 'img/nes'},
    {id: 4, title: 'té', price: 325, thumbnail: 'img/te'},
];


//Ruta de listar productos
router.get('', (req, res)=>{
    if(productos.length > 0){
        res.json(productos);
    }else{
        res.json({error : 'no hay productos cargados'});
    }
});

//Ruta de listar un solo producto
router.get('/:id', (req, res)=>{
    let producto = productos.filter(prod => prod.id === parseInt(req.params.id));
    if(producto.length > 0){
        res.json(producto);
    }else{
        res.json({error : 'producto no encontrado'});
    }
});

//Ruta post para guardar un product
router.post('/guardar', (req, res)=>{
    let newProduct = {id: `${productos.length+1}`, title: 'vinagre', price: 325, thumbnail: 'img/vinagre'};
    productos.push(newProduct);
    res.json(newProduct);
});

//Ruta post para actualizar un product
router.put('/actualizar/:id', (req, res)=>{
    let productUpdate = productos.filter(product => product.id === parseInt(req.params.id));
    res.json({productoActualizado: productUpdate});
});

//Ruta post para borrar un product
router.delete('/borrar/:id', (req, res)=>{
    let productDelete = productos.filter(product => product.id === parseInt(req.params.id));
    productos = productos.filter(product => product.id !== parseInt(req.params.id));
    res.json({productoActualizado: productDelete});
});

module.exports = router;