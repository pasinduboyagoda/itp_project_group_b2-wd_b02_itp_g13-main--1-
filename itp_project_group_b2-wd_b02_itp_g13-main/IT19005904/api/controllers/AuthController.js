const logger  = sails.log
const passport = require('passport');
const CipherService = require('../services/CipherService');

module.exports={
    login_view : function(req,res){
		res.view('partials/login',{	layout:"template"	})
	},

    login: async function (req, res) {
		if (!req.body.email || !req.body.password) {
			return res.view('partials/login',{
				status: 'error',
				layout:"template",
				message:"Email and Password both are required"
			});
		}
		
		let emp = await Employee.findOne({
			email: req.body.email
		});
		if (!emp) {
			return res.view('partials/login',{
				status: 'error',
				layout:"template",
				message:"You are not registered. Click here to <a href='/signup'>Signup</a>"
			});
		}
		try {
			if (emp.password) {
				passport.authenticate('local', function (err, emp, info) {
					if ((err) || (!emp)) {
						return res.view('partials/login',{
							status: 'error',
							message: info,
							layout:"template",
						});
					} else {
						req.login(emp, function (err) {
							if (err) {
								return res.serverError(err);
							} else {
								res.cookie('jwt', CipherService.createToken(emp), {
									secure: req.connection.encrypted ? true : false,
									httpOnly: true,
									signed:true
								});
								res.locals.user=emp
								return res.redirect('/my_leaves')
							}
						})
					}
				})(req, res);
			} 
		} catch (err) {
			logger.info('Login Error   :   ', err);
			return res.serverError("Try <a href='/login'>Signing in</a>  again! ")
		}
	},


	signup_view : function(req,res){
		res.view('partials/signup',{
			layout:'template'
		})
	},
	signup: async function (req, res) {
			logger.info("SIGN Up Body   :   ", req.body);
			if (
				!req.body.name ||
				!req.body.email ||
				!req.body.password
			) {
				return res.view('partials/signup',{
					status: 'error',
					layout:"template",
					message:"All fields are mandatory"
				});
			}
			
			let existingEmail = await Employee.findOne({
				email: req.body.email,
			});
			if (existingEmail) {
				return res.view('partials/signup',{
					status: 'error',
					layout:"template",
					message:"Email already registered"
				});
			}
			else{
			let empData = {
				name: req.body.name,
				email: req.body.email,
				password:req.body.password,
				role: (await Role.findOne({role:'EMPLOYEE'})).id
			};
			await EmployeeService.createEmployee(empData,function(err,emp){
				if(err)
					return res.serverError(err.message)
				else{
					req.emp=emp;
					res.locals.user = emp;
					try {
						res.cookie('jwt', CipherService.createToken(emp), {
							secure: req.connection.encrypted ? true : false,
							httpOnly: true,
							signed:true
						});
					} catch (err) {
						console.log('Following error is generated: ' + err);
						return res.serverError("Try <a href='/signup'>Signing up</a>  again! ")
					}
					return res.redirect('/my_leaves')
				}
			});
			
		}
	},

	logout: async function (req, res) {
		req.emp=null;
		res.cookie('jwt', null, {
			secure: req.connection.encrypted ? true : false,
			httpOnly: true
		  });
		req.session.destroy();
		res.redirect('/login')
	}
};