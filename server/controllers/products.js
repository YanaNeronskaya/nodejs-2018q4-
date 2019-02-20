const _ = require('lodash');
const jwt  = require('jsonwebtoken');
const products = require('../models/products');

module.exports = {
    getAllProducts: () => {
        const data = products;

        if(data) {
            return Promise.resolve({
                data: data,
                token: data ? jwt.sign({ products: 'all' }, 'RESTFULAPIs') : ''
            })
        } else {
            Promise.reject(`Error. There aren't products.`);
        }
    },
    createNewProduct: () => {
        const data = 'Create product';

        return Promise.resolve({
            data: data,
            token: data ? jwt.sign({ products: 'newproduct' }, 'RESTFULAPIs') : ''
        });
    },
    getProductById: id => {
        const product = _.find(products, { id });

        if(product) {
            return Promise.resolve({
                data: product,
                token: product ? jwt.sign({ id: id, name: product.name }, 'RESTFULAPIs') : ''
            });
        } else {
            Promise.reject(`Error. Product with id "${id}" not found`);
        }
    },
    getProductReviewsById: id => {
        const product = _.find(products, { id });

        if(product) {
            return {
                data: product.reviews,
                token: product ? jwt.sign({ id: id, name: product.name, reviews: product.reviews }, 'RESTFULAPIs') : ''
            };
        } else {
            Promise.reject(`Error. Product with id "${id}" not found`);
        }
    }
};
