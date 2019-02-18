const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/auth')(passport);

const Auth = require('../controllers/auth');
const auth = new Auth();

router.get('/',
    function (req, res) {
        res.render('auth',  { message: req.flash('message') });
    });

router.post('/', function (req, res) {
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

// /* Handle Login POST */
// router.post('/', passport.authenticate('login', {
//     successRedirect: '/userpage',
//     failureRedirect: '/error',
//     failureFlash : true
// }));

module.exports = router;
