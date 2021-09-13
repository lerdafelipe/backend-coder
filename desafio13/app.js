const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io') (http);
const productos = [];
const messages = [{ author: 'Juan', fyh: '01/09/2021 09:33:55', text: '¡Hola! ¿Que tal?' },
                  { author: 'Pedro', fyh: '01/09/2021 09:34:45', text: '¡Muy bien! ¿Y vos?' },
                  { author: 'Ana', fyh: '01/09/2021 09:35:30', text: '¡Genial!' }
                ];


app.use(express.static('./public'));


//Socket
io.on('connection', (socket)=>{
    io.emit('productos', {productos});
    socket.on('producto', (data)=>{
        productos.push({...data, id: socket.id});
        io.sockets.emit('productos', {productos});
    });
    io.emit('messages', {messages});
    socket.on('message', (data)=>{
        messages.push({...data, id: socket.id});
        io.sockets.emit('messages', {messages});
    });
});




//Ruta de listar productos
app.get('/productos', (req, res)=>{
    if(productos.length > 0){
        res.json(productos);
    }else{
        res.json({error : 'no hay productos cargados'});
    }
});

//Ruta de listar un solo producto
app.get('/productos/:id', (req, res)=>{
    let producto = productos.filter(prod => prod.id === parseInt(req.params.id));
    if(producto.length > 0){
        res.json(producto);
    }else{
        res.json({error : 'producto no encontrado'});
    }
});

//Ruta post para guardar un product
app.post('/productos', (req, res)=>{
    let newProduct = {id: productos.length+1, title: '', price: '', thumbnail: ''}
    //productos.push(newProduct);
    res.send('producto enviado');
});

//Ruta post para actualizar un product
app.put('/productos/:id', (req, res)=>{
    let productUpdate = productos.filter(product => product.id === parseInt(req.params.id));
    res.json({productoActualizado: productUpdate});
});

//Ruta post para borrar un product
app.delete('/productos/:id', (req, res)=>{
    let productDelete = productos.filter(product => product.id === parseInt(req.params.id));
    productos = productos.filter(product => product.id !== parseInt(req.params.id));
    res.json({productoActualizado: productDelete});
});



http.listen(8080,()=>{
    console.log('Servidor en el puerto 8080')
});