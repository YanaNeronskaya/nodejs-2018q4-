const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    _id: {
        type: String,
        unique: true
    },
    name: String,
    reviews: [String]
});

const ProductModel = mongoose.model('Product', Product );

module.exports = ProductModel;
