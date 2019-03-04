const mongoose = require('mongoose');
const cities = require('./mockedSchemes/cities');
const users = require('../postgres/models/users');
const products = require('../postgres/models/products');
const CityModel = require('../../server/models/city');
const UserModel = require('../../server/models/user');
const ProductModel = require('../../server/models/product');
//const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/nodejs-db";

mongoose.connect(url);

const initMongoDb = () => {
    CityModel.insertMany(cities, function(err, res) {
        if (err) throw err;
        const error = res[0].validateSync();
        if (error) throw new Error(error);
        console.log("Number of cities inserted: " + res.length);
    });
    UserModel.insertMany(users, function(err, res) {
        if (err) throw err;
        const error = res[0].validateSync();
        if (error) throw new Error(error);
        console.log("Number of users inserted: " + res.length);
    });
    ProductModel.insertMany(products, function(err, res) {
        if (err) throw err;
        const error = res[0].validateSync();
        if (error) throw new Error(error);
        console.log("Number of products inserted: " + res.length);
    });
    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     const dbo = db.db("nodejs-db");
    //     dbo.createCollection("cities", function (err, res) {
    //         if (err) throw err;
    //         console.log("Collection created!");
    //         db.close();
    //     });
    //     dbo.collection("cities").insertMany(cities, function (err, res) {
    //         if (err) throw err;
    //         console.log("Number of documents inserted: " + res.insertedCount);
    //         db.close();
    //     });
    // });
};

module.exports = {
    initMongoDb: initMongoDb
};
