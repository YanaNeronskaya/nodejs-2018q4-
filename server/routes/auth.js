const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth');

const auth = new Auth();

router.get('/',
    function (req, res) {
        res.render('auth',  { basedir: '../server/script' });
    });

router.post('/', function(req,res){
    const { name, password } = req.body;

    console.log("User name = "+name+", password is "+password);

    const authData = auth.checkExistingUser(name, password);

    if (authData.token) {
        const response = {
            code: 200,
            message: "OK",
            ...authData
        };
        res.json(response);
    } else {
        const response = {
            code: 404,
            message: "Not Found",
            data: {}
        };
        res.json(response);
    }
});

module.exports = router;
