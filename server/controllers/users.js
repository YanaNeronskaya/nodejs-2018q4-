const jwt = require('jsonwebtoken');
const {User} = require('../../db/setup');

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
};
