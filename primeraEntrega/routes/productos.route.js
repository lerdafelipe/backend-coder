const express = require('express');
//Router
const router = express.Router();
//
const administrador = false;


//Array de productos
let productos = [
    {id: 1, description: 'Azucar continental 1kg',stock: 0, title: 'Azúcar', price: 65, thumbnail: 'https://www.casa-segal.com/wp-content/uploads/2019/03/azucar-kilo-ledesma-reposteria-mendoza-casa-segal-1-600x600.jpg'},
    {id: 2, description: 'Yerba La merced 1kg',stock: 3, title: 'yerba', price: 425, thumbnail: 'https://farmacityar.vteximg.com.br/arquivos/ids/203684-1000-1000/161138_yerba-mate-x-1-2-kg_imagen-1.png?v=637376113356500000'},
    {id: 3, description: 'Cacao Nesquik 1kg', stock: 5, title: 'nesquik', price: 180, thumbnail: 'https://walmartar.vteximg.com.br/arquivos/ids/886272-1000-1000/Cacao-En-Polvo-Nesquik-X-150gr-1-474466.jpg?v=637456446029130000'},
    {id: 4, description: 'té verde 30u', stock: 12, title: 'té', price: 193, thumbnail: 'https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2019/07/10085232/RFB-0507-5-tedemanzanilla.jpg'},
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
router.post('', (req, res)=>{
    if(administrador){
        productos.push(req.body);
    }else{
        res.send({error: -1, descripcion: 'Ruta con método no autorizada'});
    }
});

//Ruta post para actualizar un product
router.put('/:id', (req, res)=>{
    if(administrador){
        productos = productos.filter(product => product.id !== parseInt(req.params.id));
        productUpdate = req.body;
        productos.push({...productUpdate, id: req.params.id});
    }else{
        res.send({error: -1, descripcion: 'Ruta con método no autorizada'});
    }
});

//Ruta post para borrar un product
router.delete('/:id', (req, res)=>{
    if(administrador){
        productos = productos.filter(product => product.id !== parseInt(req.params.id));
    }else{
        res.send({error: -1, descripcion: 'Ruta con método no autorizada'});
    }
});

module.exports = router;