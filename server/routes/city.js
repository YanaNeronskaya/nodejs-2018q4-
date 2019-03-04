const router = require('express').Router();
const citiesController = require('../controllers/cities');

router.get('/randomCity', (req, res) => {
    citiesController
        .getRandomCity()
        .then(city => res.json(city));
});

router.post('/:name&:country&:capital&:location', (req, res) => {
    citiesController
        .createNewCity(req.params)
        .then((city) => res.json(city));
});

router.put('/:id&:name&:country&:capital&:location', (req, res) => {
    const { id, name, country, capital, location} = req.params;

    citiesController
        .updateCityById(id, {
            name, country, capital, location
        })
        .then((city) => res.json(city));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    citiesController
        .deleteCityById(id)
        .then((city) => res.json(city));
});

module.exports = router;
