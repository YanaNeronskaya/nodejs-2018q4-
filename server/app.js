const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('./middlewares/cookieParser');
const queryParser = require('./middlewares/queryParser');
const router = require('./routes');
const passport = require('passport');
const flash=require("connect-flash");
const expressSession = require('express-session');
const { initDb } = require('../db/postgres/setup');
const { initMongoDb } = require('../db/mongo/setup');

app.use(expressSession({secret: 'mySecretKey'}));

initDb();
initMongoDb();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser);
app.use(queryParser);

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', router);

module.exports = {
    app
};
