const jwt  = require('jsonwebtoken');
const credentials = require('../confident/credentials');

class Auth {
    checkExistingUser(username, password){
        if (!username || !password) throw new Error('Error. Invalid password or username');

        if(credentials.userName === username && credentials.password === password) {
            console.log(`User ${username} was found`);
            return {
                data: {
                    username: username,
                    email: 'default@email.com'
                },
                token: jwt.sign({ username: username, password: password}, 'RESTFULAPIs')
            };
        } else {
            console.log(`User ${password} was not found`);
            return false;
        }
    };
}

module.exports = Auth;
