const express = require('express');
const mensajesSchema = require('../schemas/mensajesSchema');
//Router
const router = express.Router();


//Ruta de listar mensaje
router.get('/', async(req, res)=>{
    const mensaje = await mensajesSchema.find();

    res.json(mensaje);
});

//Ruta de listar un solo mensaje
router.get('/:id', async(req, res)=>{
    const {id} = req.params;

    const mensaje = await mensajesSchema.findById(id);

    res.json(mensaje);
});

//Ruta post para guardar un mensaje
router.post('/', async (req, res)=>{
    const mensaje = req.body;

    const newMensaje = new mensajesSchema(mensaje);
    await newMensaje.save();
});

//Ruta post para actualizar un mensaje
router.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const mensajeChange = req.body;

    const mensajeUpdate = await mensajesSchema.updateOne({_id: id}, {
        $set: {mensajeChange}
    });

    res.json(mensajeUpdate);
});

//Ruta post para borrar un mensaje
router.delete('/:id', async (req, res)=>{
    const {id} = req.params;

    const mensaje = await mensajesSchema.findOneAndDelete({_id: id});

    res.json({mensaje: mensaje})
});

module.exports = router;