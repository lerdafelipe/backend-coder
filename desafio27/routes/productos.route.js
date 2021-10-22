const express = require('express');
const productsSchema = require('../Schemas/productsSchema');
//Router
const router = express.Router();


//Ruta de listar productos
router.get('/', async (req, res)=>{
    const products = await productsSchema.find();

    res.json(products);
});

//Ruta de listar un solo producto
router.get('/:id', async(req, res)=>{
    const {id} = req.params;

    const product = await productsSchema.findById(id);

    res.json(product);
});

//Ruta post para guardar un product
router.post('/', async(req, res)=>{

    const newProduct = new productsSchema(req.body);
    let productSave = await newProduct.save();

    res.json(productSave);
});

//Ruta post para actualizar un product
router.put('/:id', async (req, res)=>{
    const {id} = req.params;

    const productUpdate = await productsSchema.updateOne({_id: id}, {
        $set: req.body
    });

    res.json(productUpdate);
});

//Ruta post para borrar un product
router.delete('/:id', async (req, res)=>{
    const {id} = req.params;

    const product = await productsSchema.findOneAndDelete({_id: id});

    res.json({product: product})
});

module.exports = router;