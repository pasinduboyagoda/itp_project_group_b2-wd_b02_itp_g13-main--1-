/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */



 module.exports.bootstrap = async function(cb) {
	await Role.destroy({});
	await Leavetype.destroy({});
	await Leaves.destroy({});
	await Employee.destroy({});
	await Balanceleaves.destroy({});
    let admin  =  await Role.create({
		role: "ADMIN"
	});
	await Role.create({
		role: "EMPLOYEE"
	});

	await Leavetype.create({
		type: 'SICK_LEAVE',
	});

	await Leavetype.create({
		type: 'CASUAL_LEAVE',
	});

	await Leavetype.create({
		type: 'STUDY_LEAVE',
	});

	await EmployeeService.createEmployee({
		name: 'Admin',
		password: 'admin@rocks',
		email:'a@b.c',
		role: admin.id
	},function(err,emp){
		if(err)
			throw err;
	});
  cb()
};
