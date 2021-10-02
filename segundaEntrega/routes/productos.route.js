const express = require('express');
//Router
const router = express.Router();
//
const admin = require('firebase-admin');
const serviceAccount = require('./database/ch-db-ecommerce-firebase-adminsdk-9kmsb-2f9945aa9f.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const query = db.collection('productos');

//Ruta de listar productos
router.get('/', async (req, res)=>{
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc)=>({
        id: doc.id,
        nombre: doc.data().nombre,
        descripcion: doc.data().descripcion,
        codigo: doc.data().codigo,
        foto: doc.data().foto,
        precio: doc.data().precio,
        stock: doc.data().stock
    }));

    res.json(response);
});

//Ruta de listar un solo producto
router.get('/:id', async(req, res)=>{
    let {id} = req.params;
    const doc = query.doc(`${id}`);
    const item = await doc.get();
    const response = item.data();
    
    res.json(response);
});

//Ruta post para guardar un product
router.post('/', async(req, res)=>{
    let doc = req.body;
    await query.create(doc);
});

//Ruta post para actualizar un product
router.put('/:id', async (req, res)=>{
    let {id} = req.params;
    let productUpdate = req.body;
    const doc = query.doc(`${id}`);
    let item = await doc.update(req.body);
});

//Ruta post para borrar un product
router.delete('/:id', async (req, res)=>{
    let {id} = req.params;
    const doc = query.doc(`${id}`);
    let item = await doc.delete();
});

module.exports = router;