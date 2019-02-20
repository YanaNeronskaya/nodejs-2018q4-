const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', (req, res) => {
    usersController.getAllUsers()
        .then(users => res.json(users));
});

module.exports = router;
