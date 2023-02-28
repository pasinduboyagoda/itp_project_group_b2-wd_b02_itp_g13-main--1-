var passport = require('passport');
module.exports = function (req, res, next) {
	req.headers.authorization='Bearer '+req.signedCookies.jwt
		passport.authenticate('jwt', async function (error, user, info) {
		if (error) {
			return res.serverError(error);
		}
		if (!user) {
			return res.redirect("/login")
		}
		let userExists = await Employee.findOne({id:user.id});
		if(!userExists)
			return  res.redirect('/logout')
        req.emp = user;
		res.locals.user=user
		next();
	})(req, res);
}; 