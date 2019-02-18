const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('./middlewares/cookieParser');
const queryParser = require('./middlewares/queryParser');
const router = require('./routes');
const passport = require('passport');
const flash=require("connect-flash");
const expressSession = require('express-session');

app.use(expressSession({secret: 'mySecretKey'}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser);
app.use(queryParser);

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', router);

// passport.serializeUser(function(user, done) {
//     done(null, user.name);
// });
//
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

module.exports = app;
