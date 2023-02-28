var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports = {

	/**
	 * Hash the password field of the passed user.
	 */
	hashPassword: function (user) {
		if (user.password) {
			return user.password = bcrypt.hashSync(user.password);
		}
	},

	/**
	 * Compare user password hash with unhashed password
	 * @returns boolean indicating a match
	 */
	comparePassword: function (password, user) {
		return bcrypt.compareSync(password, user.password);
	},

	/**
	 * Create a token based on the passed user
	 * @param user
	 */
	createToken: function (user) {
		let settings = 	sails.config.jwtSettings
		delete settings.secretOrKey;
		delete settings.jwtFromRequest;
		delete settings.passReqToCallback;
		return jwt.sign({
				user: user.toJSON(),
			},
			process.env.tokret,sails.config.jwtSettings
		);
		
	}
};