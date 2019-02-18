const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);

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

router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect:'/auth/google/callback'}),
    (req, res) => {
        res.redirect('/auth-happy');
    }
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/auth-happy',
        failureRedirect: '/auth-bad' }));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/auth-twitter-yes',
        failureRedirect: '/auth-bad' }));

module.exports = router;
