//express
const express = require('express');
//Router
const router = express.Router();

//transporter
const {
    transporter,
    mailOptions
} = require('../mail/mail');

//transporter Gmail
const {
    transporterG,
    mailOptionsG
} = require('../mail/gmail');

//
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_CLIENT_ID = 1009302292964774;
const FACEBOOK_CLIENT_SECRET = '5ea0b7ad4291725ab1293d894e3ac1a7';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/facebook/callback',
    profileFields: ['id', 'first_name', 'last_name', 'picture', 'email'],
    scope: ['email']
},
    function (accesToken, refreshToken, profile, done) {
        console.log('profile:', profile);
        console.log('accessToken:', accesToken);
        console.log('refreshToken:', refreshToken);
        let userProfile = profile;
        done(null, userProfile);
    })
);

passport.serializeUser(function (user, done) {
    done(null, user)
});
passport.deserializeUser(function (usuario, done) {
    done(null, usuario);
});

router.get('/log', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ log: true })
    } else res.json({ log: false })
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/fail-login'
})
);

router.get('/success', (req, res)=>{    
    let date = new Date;
    //Ethereal email
    transporter.sendMail(mailOptions('logueo', req.first_name, date), (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info);
    });
    //Gmail
    transporter.sendMail(mailOptions(req.user.email,'logueo', req.user.first_name, date), (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info);
    });
});

router.get('/fail-login', (req, res) => {
    res.send('error de logueo')
});

router.get('/logout', (req, res) => {
    let date = new Date;
    transporter.sendMail(mailOptions('deslogueo', req.user.first_name, date), (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info)
    });
    req.logout();
    res.send('Success!');
});

router.get('/info-user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    }
});

module.exports = router;