const express = require('express');
const app = express();
//Routes
const products = require('./routes/productos.route');
const Connection = require('./database/Connection');
//
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const mongoStore = require('connect-mongo');
//
const advanceOptions = {useNewUrlParser: true, useUnifiedTopology: true};

const session = require('express-session');
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ecommerce',
        mongoOptions: advanceOptions,
        ttl: 3000
    }),
    secret: 'manolito',
    resave: false, 
    saveUninitialized: false,
    cookie:{
        maxAge: 600000
    }
}));
const cors = require('cors');
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
Connection();

//routes
app.use('/productos', products);

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_CLIENT_ID = 15;
const FACEBOOK_CLIENT_SECRET = '';

passport.use(new FacebookStrategy({
    clientID: process.argv[2] || FACEBOOK_CLIENT_ID,
    clientSecret: process.argv[2] || FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'first_name', 'last_name', 'picture', 'email'],
    scope: ['email']
},
    function(accesToken, refreshToken, profile, done){
        console.log(profile);
        let userProfile = profile;
        done(null, userProfile);
    })
);

passport.serializeUser(function(user, done){
    done(null, user)
});
passport.deserializeUser(function(usuario, done){
    done(null, usuario);
})

app.use(passport.initialize());
app.use(passport.session());

app.get('/log', (req, res)=>{
    if (req.isAuthenticated()){
        res.json({log: true})
    }else res.json({log: false})
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook',{
        successRedirect: '/', 
        failureRedirect: '/fail-login'
    })
);

app.get('/fail-login', (req, res)=>{
    res.send('error de logueo')
});

app.get('/logout', (req, res)=>{
    req.logout();
    res.send('Success!');
});

app.get('/info-user', (req, res)=>{
    if(req.isAuthenticated()){
        res.json({user: req.user});
    }
});


app.get('/info', (req, res)=>{
    res.json({
        Argumentos_de_entrada: process.argv,
        Path: process.execPath,
        plataforma: process.platform,
        id: process.pid,
        node_version: process.version,
        carpeta: process.cwd(),
        uso_memoria: process.memoryUsage()
    })
});

app.get('/randoms', (req, res)=>{
    const cant = req.query.cant || 100000000;
    const numeros = [];
    function random (){
        return Math.floor(Math.random () * (1000-1)) + 1;
    }
    for (let index = 0; index < cant; index++) {
        let newNum = random();
        let num = {numero: newNum, cantidad: exist(newNum)};
        function exist(element){
            cantidad = numeros.filter(num => num.numero === element);
            return cantidad.length + 1;
        }
        numeros.push(num);
    }
    res.json(numeros);
});


const server = app.listen(8080, ()=>{
    console.log('Servidor escuchando en el puerto 8080');
}); 

//Manejo de error del servidor
server.on('error', error =>{
    res.json({error: -2, descripcion: 'Ruta con método con implementada'}, error);
});