const jwt  = require('jsonwebtoken');
const ProductModel = require('../models/product');
const { Product } = require('../../db/postgres/setup');
const addLastModifiedData = require('../../db/mongo/getLastModifiedData');

module.exports = {
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            ProductModel.find({}, function (err, res) {
                if (err) reject(err);
                resolve({
                    data: res,
                    token: res ? jwt.sign({ products: 'all' }, 'RESTFULAPIs') : ''
                });
            });
        });
    },
    createNewProduct: () => {
        return new Promise((resolve, reject) => {
            const modifiedData = addLastModifiedData();

            ProductModel.insertMany({...data, ...modifiedData}, function (err, res) {
                if (err) reject(err);
                const error = res[0].validateSync();
                if (error) throw new Error(error);
                console.log("Number of products inserted: " + res.length);
                resolve(res);
            });
        });
    },
    getProductById: id => {
        return new Promise((resolve, reject) => {
            ProductModel.find({id: id}, function (err, res) {
                if (err) reject(err);
                resolve({
                    data: res,
                    token: res ? jwt.sign({ id: id, name: res.name }, 'RESTFULAPIs') : ''
                });
            });
        });
    },
    getProductReviewsById: id => {
        return new Promise((resolve, reject) => {
            const query = ProductModel.find({}).select('reviews');

            query.exec(function (err, res) {
                if (err) reject(err);
                resolve({
                    data: res,
                    token: res ? jwt.sign({ id: id, name: res.name, reviews: res.reviews }, 'RESTFULAPIs') : ''
                });
            });
        });
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
