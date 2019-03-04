const _ = require('lodash');
const jwt  = require('jsonwebtoken');
const ProductModel = require('../models/product');
const { Product } = require('../../db/postgres/setup');

module.exports = {
    getAllProducts: () => {
        const data = Product.findAll();

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
        Product
            .findOrCreate({})
            .spread((user, created) => {
                console.log(user.get({
                    plain: true
                }));
                console.log(created)
            });

        return Promise.resolve({
            data: data,
            token: data ? jwt.sign({ products: 'newproduct' }, 'RESTFULAPIs') : ''
        });
    },
    getProductById: id => {
        const product = Product.findById(id);

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
        const product = Product.findAll({ where: { id: id } });

        if(product) {
            return {
                data: product.reviews,
                token: product ? jwt.sign({ id: id, name: product.name, reviews: product.reviews }, 'RESTFULAPIs') : ''
            };
        } else {
            Promise.reject(`Error. Product with id "${id}" not found`);
        }
    },
    deleteProductById: id => {
        return new Promise((resolve, reject) => {
            ProductModel.deleteOne({id: id}, function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
};
