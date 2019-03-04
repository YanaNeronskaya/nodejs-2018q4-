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
    createNewCity: (data) => {
        return new Promise((resolve, reject) => {
            CityModel.insertMany(data, function (err, res) {
                if (err) reject(err);
                const error = res[0].validateSync();
                if (error) throw new Error(error);
                console.log("Number of cities inserted: " + res.length);
                resolve(res);
            });
        });
    },
    updateCityById: (id, data) => {
        return new Promise((resolve, reject) => {
            CityModel.findOneAndUpdate({_id:id}, data, {}, function (err, res) {
                if (err) {
                    CityModel.create(data, function (err, res) {
                        if (err) reject(err);
                        resolve(res);
                    })
                } else {
                    resolve(res);
                }
            });
        });
    },
    deleteCityById: id => {
        return new Promise((resolve, reject) => {
            CityModel.deleteOne({id: id}, function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
};
