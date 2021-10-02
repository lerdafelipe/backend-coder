const express = require('express');
//Router
const router = express.Router();
//
const {options} = require('../mariaDB');
const knex = require('knex')(options);


//Ruta de listar productos
router.get('/', (req, res)=>{
    knex('items').select('*').then(data=>{
        res.json(data);
    })
});

//Ruta de listar un solo producto
router.get('/:id', (req, res)=>{
    const {id}= req.params;
    knex('productos').select('*').where({id}).then(data=>{
        res.json(data);
    })
});

//Ruta post para guardar un product
router.post('/', (req, res)=>{
    const {product} = req.body;
    if(administrador){
        knex('productos').insert(product);
    }else{
        res.send({error: -1, descripcion: 'Ruta con método no autorizada'});
    }
});

//Ruta post para actualizar un product
router.put('/:id', (req, res)=>{
    const {product}=req.body;
    const {id}=req.params;
    if(administrador){
        knex('productos').where({id}).update(product);
    }else{
        res.send({error: -1, descripcion: 'Ruta con método no autorizada'});
    }
});

//Ruta post para borrar un product
router.delete('/:id', (req, res)=>{
    const {id}=req.params;
    if(administrador){
        knex('productos').where({id}).del();
    }else{
        res.send({error: -1, descripcion: 'Ruta con método no autorizada'});
    }
});

module.exports = router;