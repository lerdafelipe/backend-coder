const express = require('express');
//Router
const router = express.Router();



//Ruta de listar mensaje
router.get('/login', (req, res)=>{
    res.cookie('login', true, {maxAge: 60000});
});

router.get('/log', (req, res)=>{
    res.json({log: req.cookies.login});
});

router.get('/logout', (req, res)=>{
    res.clearCookie('login');
});

module.exports = router;