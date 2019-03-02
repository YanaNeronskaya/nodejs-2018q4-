const forEach = require('lodash/forEach');
const products = require('./models/products');
const users = require('./models/users');

const makeAssociations = (Product, User) => {
    if(User && Product) {
        Product.belongsTo(User, { UserId: "UserId" });
    }
};

const importProductsToDb = (Product) => {
    Product.sync({force: true}).then(() => {
        forEach(products, (product) => {
            return Product.create({
                name: product.name,
                reviews: product.reviews
            })
        })
    });

    // sequelize.query('SELECT * FROM Products;', {type: sequelize.QueryTypes.SELECT})
    //     .then(products=> {
    //         console.log(products)
    //     });
};

const importUsersToDb = (User) => {
    User.sync({force: true}).then(() => {
        forEach(users, (user) => {
            return User.create({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            })
        })
    });

    // sequelize.query('SELECT * FROM Users;', {type: sequelize.QueryTypes.SELECT})
    //     .then(users => {
    //         console.log(users)
    //     });
};

const InitialImport = (Product, User) => {
    importProductsToDb(Product);
    importUsersToDb(User);
    makeAssociations(Product, User);
};

module.exports = {
    importProductsToDb: importProductsToDb,
    importUsersToDb: importUsersToDb,
    InitialImport: InitialImport
};
