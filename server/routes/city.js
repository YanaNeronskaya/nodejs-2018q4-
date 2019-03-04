const router = require('express').Router();
const citiesController = require('../controllers/cities');

router.get('/', (req, res) => {
    citiesController
        .getRandomCity()
        .then(city => res.json(city));
});

module.exports = router;
