const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    _id: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    email: String
});

const UserModel = mongoose.model('User', User );

module.exports = UserModel;
