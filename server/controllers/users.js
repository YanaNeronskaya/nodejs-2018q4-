const jwt = require('jsonwebtoken');
const { User } = require('../../db/postgres/setup');
const UserModel = require('../models/city');

module.exports = {
    getAllUsers: () => {
        const result = User.findAll();

        console.log(result.then(res => console.log(res)));

        if (result) {
            return Promise.resolve({
                data: result,
                token: result ? jwt.sign({name: 'all-users'}, 'RESTFULAPIs') : ''
            });
        } else {
            Promise.reject(`Error. Users were not not found`);
        }
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
