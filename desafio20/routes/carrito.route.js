const express = require('express');
//Router
const router = express.Router();


//Array de productos
const carrito = {
    id: Date.now(),
    productos: [
        {id: 1, description: 'Azucar continental 1kg',stock: 0, title: 'Azúcar', price: 65, thumbnail: 'https://www.casa-segal.com/wp-content/uploads/2019/03/azucar-kilo-ledesma-reposteria-mendoza-casa-segal-1-600x600.jpg'},
        {id: 2, description: 'Yerba La merced 1kg',stock: 3, title: 'yerba', price: 425, thumbnail: 'https://farmacityar.vteximg.com.br/arquivos/ids/203684-1000-1000/161138_yerba-mate-x-1-2-kg_imagen-1.png?v=637376113356500000'},
        {id: 3, description: 'Cacao Nesquik 1kg', stock: 5, title: 'nesquik', price: 180, thumbnail: 'https://walmartar.vteximg.com.br/arquivos/ids/886272-1000-1000/Cacao-En-Polvo-Nesquik-X-150gr-1-474466.jpg?v=637456446029130000'},
        {id: 4, description: 'té verde 30u', stock: 12, title: 'té', price: 193, thumbnail: 'https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2019/07/10085232/RFB-0507-5-tedemanzanilla.jpg'},
    ]
};

let productosCart = carrito.productos;

//Ruta de listar carrito
router.get('/', (req, res)=>{
    res.json({productosCart});
});

//Ruta de listar un solo producto
router.get('/:id', (req, res)=>{
    let productCart = productosCart.filter(product=>{product.id === req.params.id})
    res.json({productCart});
});

//Ruta post para guardar un product
router.post('/', (req, res)=>{
    carrito.productos.push(req.body);
});

//Ruta post para actualizar un product
router.put('/:id', (req, res)=>{
    carrito.productos = carrito.productos.filter(product => product.id !== parseInt(req.params.id));
    carritoUpdate = req.body;
    productos.push({...carritoUpdate, id: req.params.id});
    res.json({carrito});
});

//Ruta post para borrar un product
router.delete('/:id', (req, res)=>{
    carrito.productos = carrito.productos.filter(product => product.id !== parseInt(req.params.id));
});

module.exports = router;