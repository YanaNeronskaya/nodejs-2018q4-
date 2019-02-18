const router = require('express').Router();
const product = require('./product');
const user = require('./user');
const auth = require('./auth');

router.use('/api/products', product);
router.use('/api/users', user);
router.use('/auth', auth);

module.exports = router;
