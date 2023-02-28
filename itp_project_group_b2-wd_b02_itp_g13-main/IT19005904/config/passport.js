/**
 * Passport configuration file where you should configure strategies
 */
require("dotenv").config()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const EXPIRES_IN_MINUTES = 60 * 48;
const SECRET = process.env.tokret
const ALGORITHM = "HS256";
var ISSUER = "rahul";
var AUDIENCE = "kumar";

passport.serializeUser(function (user, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    done(null, user.id);
});


var LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    
};

var JWT_SETTINGS = {
    expiresIn: '7d',
    algorithm: ALGORITHM,
    issuer:ISSUER,
    audience:AUDIENCE,
    secretOrKey:SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(req, email, password, next) {
    Employee.findOne({email: email}).populate('role')
        .exec(function (error, user) {
            if (error) return next(error, false, {});
            if (!user) return next(null, false, 'Incorrect Email!',);
            if (!CipherService.comparePassword(password, user))
                return next(null, false, 'Incorrect Password!');
            delete user.password
            user.role = user.role.role
            return next(null, user, {});
        });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
    var user = payload.user;
    return next(null, user, {});
}


passport.use(
    new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));

passport.use(
    new JwtStrategy(JWT_SETTINGS, _onJwtStrategyAuth));

module.exports.jwtSettings = JWT_SETTINGS;
