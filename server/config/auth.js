const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../confident/credentials');

module.exports = function(passport) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.password;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        if(jwt_payload.name === config.userName) {
            done(null, user);
        } else {
            done(null, false);
        }
    }));
};
