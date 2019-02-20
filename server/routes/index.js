const router = require('express').Router();
const product = require('./product');
const user = require('./user');
const auth = require('./auth');
const authSucc = require('./auth-successful');

router.use('/api/products', product);
router.use('/api/users', user);
router.use('/auth', auth);
router.use('/auth-happy', authSucc);

module.exports = router;
