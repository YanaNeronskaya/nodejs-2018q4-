const _ = require('lodash');
const jwt  = require('jsonwebtoken');
//const MongoClient = require('mongodb').MongoClient;
const CityModel = require('../models/city');
//const url = "mongodb://localhost:27017/";

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
    getRandomCity: () => {
        const number = getRandomInt(0, 5);
        const query = CityModel.find({});

        return new Promise((resolve, reject) => {
            query.exec(function (err, docs) {
                if (err) reject(err);
                resolve(docs[number]);
            });
        });

        // return new Promise((resolve, reject) => {
        //     MongoClient.connect(url, function (err, db) {
        //         if (err) throw err;
        //         const dbo = db.db("nodejs-db");
        //         dbo.collection("cities").find({}).toArray(function(err, result) {
        //             if (err) reject(err);
        //             resolve(result[number]);
        //         });
        //     })
        // })
    },
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
    }
};
