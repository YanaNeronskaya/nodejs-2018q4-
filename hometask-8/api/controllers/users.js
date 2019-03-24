const UserModel = require("../../../server/models/user");

const getAllUsers = (req, res) => {
    UserModel.find({}, (error, users) => {
        if (error) {
            console.error("Error", error);
        }

        res.json(users);
    });
};

const deleteUserById = (req, res) => {
    const id = req.swagger.params.id.value;

    UserModel.findOneAndDelete({_id: id, }, (error, user) => {
        if (error) {
            console.error("Error", error);
        }

        res.send(user);
    });
};

module.exports = {
    getAllUsers: getAllUsers,
    deleteUserById: deleteUserById
};
