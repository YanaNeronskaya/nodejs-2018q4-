const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

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

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: "154586716039-u1u2mfhjg8ltf0kdb2kmeep6jq517cjb.apps.googleusercontent.com",
        clientSecret: "dXnbIbxKe77AbDLu4hhtKBEd",
        callbackURL: '/auth/google/callback'
    },
    (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });
    }));

    passport.use(new FacebookStrategy({
            clientID: '749030432139414',
            clientSecret: '4f045e743e10ed74be24ed38a7956527',
            callbackURL: "/auth/facebook/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }
    ));

    passport.use(new TwitterStrategy({
            consumerKey: 'TWITTER_CONSUMER_KEY',
            consumerSecret: 'TWITTER_CONSUMER_SECRET',
            callbackURL: "http://www.example.com/auth/twitter/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }
    ));
};
