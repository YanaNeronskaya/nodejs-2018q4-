const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const City = new Schema({
    name: String,
    country: String,
    capital: {
        type: Boolean,
        required: true
    },
    location:
        {
            lat: Number,
            long: Number
        }
});

const CityModel = mongoose.model('City', City );

module.exports = CityModel;
