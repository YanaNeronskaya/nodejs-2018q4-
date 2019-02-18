const jwt  = require('jsonwebtoken');
const users = require('../models/users');

module.exports = {
    getAllUsers: () => {
    const result = users;

    if(result) {
        return Promise.resolve({
            data: result,
            token: result ? jwt.sign({ name: 'all-users' }, 'RESTFULAPIs') : ''
        });
    } else {
        Promise.reject(`Error. Users were not not found`);
    }
},
};
