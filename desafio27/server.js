//express
const express = require('express');
//App en express
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
const users = require ('./schemas/userSchema');

passport.use(new FacebookStrategy({
    clientID: 15,
    clientSecret: '',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'first_name', 'last_name', 'picture', 'email'],
    scope: ['email']
},
async function(accesToken, refreshToken, profile, done){
        console.log(profile);
        let user = await users.find(profile.id, function(err, user){
            if(err) return done(err);
            done(null, user);
        });
    })
);

passport.serializeUser(function(user, done){
    done(null, user[0].username)
});
passport.deserializeUser(function(username, done){
    let usuario = users.findOne({username: username});
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

//app en el Servidor
const server = app.listen(8080, ()=>{
    console.log('Servidor escuchando en el puerto 8080');
}); 

//Manejo de error del servidor
server.on('error', error =>{
    res.json({error: -2, descripcion: 'Ruta con método con implementada'}, error);
});