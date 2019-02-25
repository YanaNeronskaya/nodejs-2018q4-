const Sequelize = require('sequelize');
const { InitialImport } = require('./baseImportsToDb');

const sequelize = new Sequelize('frontcampNodeJs', 'postgres', '1234', {
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    operatorsAliases: false,
    timeout: 160000,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    }
});

const User = sequelize.define('User', {
    firstName: {
        type: Sequelize.DataTypes.STRING
    },
    lastName: {
        type: Sequelize.DataTypes.STRING
    },
    email: {
        type: Sequelize.DataTypes.STRING
    }
});

const Product = sequelize.define('Product', {
    name: {
        type: Sequelize.DataTypes.STRING
    },
    reviews: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT)
    }
});

const initDb = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            InitialImport(Product, User);
            return sequelize;
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};

module.exports = {
    initDb: initDb,
    User: User,
    Product: Product,
    sequelize: sequelize
};
