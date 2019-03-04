const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports = {
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            UserModel.find({}, function (err, res) {
                if (err) reject(err);
                resolve({
                    data: res,
                    token: res ? jwt.sign({name: 'all-users'}, 'RESTFULAPIs') : ''
                });
            });
        });
    },
    deleteUserById: id => {
        return new Promise((resolve, reject) => {
            UserModel.deleteOne({id: id}, function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
};
