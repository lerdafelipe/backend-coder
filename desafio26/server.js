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


const bCrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require ('./schemas/userSchema');

passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
async function(req, username, password, done){
        let user = await users.find({username: username});
        if(!user) return done(null, false)
        let success =  user[0].username == username && user[0].password == password;
        if(!success) return done(null, false)
        return done(null, user);
    })
);

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    function(req, username, password, done){
        const createUser = async()=>{
            let userIs = await users.find({username: username});
            if(userIs.length > 0) return done(null, false);
            let user = {username: req.body.username, password: req.body.password}
            user.username = username;
            user.password = password;
            const newUser = new users(user);
            await newUser.save();  
            return done(null, [user]); 
        }
        process.nextTick(createUser);
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
})

app.post('/login', passport.authenticate('login', {failureRedirect: '/error-login'}), (req, res)=>{
    res.send('Success!')
});

app.post('/signup', passport.authenticate('signup', {failureRedirect: '/error-signup'}), (req, res)=>{
    res.send('Success!')
});

app.get('/error-login', (req, res)=>{
    res.send('eror de logueo')
});

app.get('/error-signup', (req, res)=>{
    res.send('eror de registro')
});

app.get('/logout', (req, res)=>{
    req.logout();
    res.send('Success!');
});

//app en el Servidor
const server = app.listen(8080, ()=>{
    console.log('Servidor escuchando en el puerto 8080');
}); 

//Manejo de error del servidor
server.on('error', error =>{
    res.json({error: -2, descripcion: 'Ruta con método con implementada'}, error);
});