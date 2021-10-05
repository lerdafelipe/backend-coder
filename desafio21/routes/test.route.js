const express = require('express');
//Router
const router = express.Router();
//
const faker = require('faker');


router.get('/', (req, res)=>{
    const cant = req.query.cant || 10;
    console.log(cant);
    const productos = [];
    if(cant === 0){
        res.json({message: "No existen productos"});
    }
    for (let i = 0; i < cant; i++) {
        productos.push({
            nombre: faker.commerce.productName(),
            categoria: faker.commerce.color(),
            stock: faker.datatype.number(),
            precio: faker.commerce.price()
        }) 
    };
    res.json(productos);
})

module.exports = router;