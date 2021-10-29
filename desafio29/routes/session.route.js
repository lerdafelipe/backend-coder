const express = require('express');
//Router
const router = express.Router();

//
router.post('/login', (req, res)=>{
    req.session.user = req.body.user;
    req.session.password = req.body.password;
    res.json({login: 'success'});
});

router.post('/signup', (req, res)=>{
    req.session.user = req.body.user;
    req.session.password = req.body.password;
    res.json({login: 'success'});
});

router.get('/log', (req, res)=>{
    if(req.session.user){
        req.session.user = req.session.user;
        req.session.password = req.session.password;
        res.json({log: true});
    }
    else{ 
        res.json({log: false})
    };
})

router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.json({msg: 'logout success'});
});

module.exports = router;