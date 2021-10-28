const express = require('express');
//Router
const router = express.Router();

//Ruta de listar mensaje
router.post('/login', (req, res)=>{
    req.session.user = req.body.user;
    req.session.password = req.body.password;
    res.send({login: 'success'});
});

router.get('/log', (req, res)=>{
    if(req.session.user){
        res.json({
            log: true
        })
    }else res.json({log: false});
})

router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.send('Logout success');
});

module.exports = router;