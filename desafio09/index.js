//express
const express = require('express');
const multer = require('multer');
//App en express
const app = express();
//Router
//const router = express.Router();





//Storage
let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads')
    },
    filename:function(req, file, cb){
        cb(null, file.filename+'-'+Date.now())
    }
})

let upload = multer({storage});


app.post('/upload', upload.single('myfile'),(req, res, next)=>{

    if(!req.file){
        const error = new Error('Sin archivos');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(req.file);
});





//Ruta a productos
const products = require('./routes/productos.route');

//Ruta a productos
app.use('/productos', products);

//Uso del static
app.use(express.static('public'));

//app en el Servidor
const server = app.listen(8080, ()=>{
    console.log('Servidor escuchando en puesto 8080');
});

//Manejo de error del servidor
server.on('error', error =>{
    console.log('Ha ocurrido un error en el servidor', error);
})