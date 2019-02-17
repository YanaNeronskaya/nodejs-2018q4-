const app = require('express')();
const cookieParser = require('./middlewares/cookieParser');
const queryParser = require('./middlewares/queryParser');
const router = require('./routes');

app.use(cookieParser);
app.use(queryParser);
app.use('/', router);

module.exports = app;
