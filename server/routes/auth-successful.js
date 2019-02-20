const router = require('express').Router();

router.get('/', function (req, res) {
    res.render('auth-yes',  { message: req.flash('message') });
});

module.exports = router;
