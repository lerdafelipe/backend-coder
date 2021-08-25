//express
const express = require('express');
//App en express
const app = express();
//multer
const multer = require('multer');



//handlebars
const handlebars = require('express-handlebars');

const productos = [
    /*{id: 1, title: 'Azúcar', price: 325, thumbnail: 'img/azu'},
    {id: 2, title: 'yerba', price: 325, thumbnail: 'img/yer'},
    {id: 3, title: 'nesquik', price: 325, thumbnail: 'img/nes'},
    {id: 4, title: 'té', price: 325, thumbnail: 'img/te'},*/
];

let productsExist = ()=>{
    if(productos.length>0){
        return true;
    }else{
        return false;
    }
} 

let productsNotExist = ()=>{
    if(productos.length=0){
        return true;
    }else{
        return false;
    }
}


app.engine("hbs",handlebars({
        extname:".hbs",
        defaultLayout:"index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir:__dirname + "/views/partials"
}))
    
app.set("views","./views");
app.set("view engine","hbs");
app.use(express.static("public"));
app.get('/',(req,res)=>{

    res.render('main',{productos: productos, productsExist: productsExist});
})





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
//app.use(express.static('public'));

//app en el Servidor
const server = app.listen(5300, ()=>{
    console.log(`Servidor escuchando ${this.adress}:5300`);
});

//Manejo de error del servidor
server.on('error', error =>{
    console.log('Ha ocurrido un error en el servidor', error);
})