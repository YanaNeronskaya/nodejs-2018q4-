const CityModel = require("../../../server/models/city");

const getRandomCity = (req, res) => {
    CityModel.find({}, (error, cities) => {
        if (error) {
            console.error("Error", error);
        }

        if (cities.length) {
            const randomCityNumber = Math.round(Math.random() * (cities.length - 1));
            res.send(cities[randomCityNumber]);
        }
    });
};

const getAllCities = (req, res) => {
    CityModel.find({}, (error, cities) => {
        if (error) {
            console.error("Error", error);
        }

        res.send(cities);
    });
};

const createNewCity = (req, res) => {
    const { name, country, capital, location } = req.swagger.params.body.value;

    CityModel.create({ name, country, capital, location }, (error, city ) => {
        if (error) {
            console.error("Error", error);
        }

        res.json(city);
    });
};

const deleteCityById = (req, res) => {
    const id = req.swagger.params.id.value;
    CityModel.findOneAndDelete({_id: id, }, (error, city) => {
        if (error) {
            console.error("Error", error);
        }

        res.json(city);
    });
};

module.exports = {
    getRandomCity: getRandomCity,
    getAllCities: getAllCities,
    createNewCity: createNewCity,
    deleteCityById: deleteCityById
};
