const router = require('express').Router();

const product = require('./product');
const user = require('./user');

router.use('/api/products', product);
router.use('/api/users', user);

module.exports = router;
