const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', (req, res) => {
    usersController.getAllUsers()
        .then(users => res.json(users));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    usersController
        .deleteUserById(id)
        .then((city) => res.json(city));
});

module.exports = router;
