const _ = require('lodash');
const products = require('../models/products');

module.exports = {
    getAllProducts: () => Promise.resolve(products),
    createNewProduct: () => Promise.resolve('Create product'),
    getProductById: id => {
        const product = _.find(products, { id });
        return product ? Promise.resolve(product) : Promise.reject(`Error. Product with id "${id}" not found`);
    },
    getProductReviewsById: id => {
        const product = _.find(products, { id });
        return product ? Promise.resolve(product.reviews) : Promise.reject(`Error. Product with id "${id}" not found`);
    }
};
