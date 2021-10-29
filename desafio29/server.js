//express
const express = require('express');
//App en express
const app = express();


//Routes
const products = require('./routes/productos.route');
const sessionRoute = require('./routes/session.route');
app.use('/productos', products);
app.use('/session', sessionRoute);


//connection with database
const Connection = require('./database/Connection');
Connection();


//cookies and auth
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
const mongoStore = require('connect-mongo');
//


const advanceOptions = {useNewUrlParser: true, useUnifiedTopology: true};

app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ecommerce',
        mongoOptions: advanceOptions,
        ttl: 3000
    }),
    secret: 'manolito',
    resave: false, 
    saveUninitialized: false,
    cookie:{maxAge: 600000}
}));


//cors
const cors = require('cors');
app.use(cors({origin:'*'}));


//
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


//app en el Servidor
const server = app.listen(8080, ()=>{
    console.log('Servidor escuchando en el puerto 8080');
}); 

//Manejo de error del servidor
server.on('error', error =>{
    res.json({error: -2, descripcion: 'Ruta con método con implementada'}, error);
});