/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }

  AuthController:{
    home:['isAuthenticated']
  },
  LeaveController:{
    'apply_leave':['isAuthenticated'],
    'apply_leave_view':['isAuthenticated'],
    'my_leaves':['isAuthenticated'],
    'deleteLeave':['isAuthenticated'],
  },
  AdminController:{
    '*':['isAuthenticated','isAdmin']
  }
};

// insert into employee  (name,email,password,role,id) values ("emp","z.x@c","$2a$10$El9nViUqKfyS1LsRVc2sx.mUFPiFtNPSQ0QRq98tdZG7CiZ1hQhfO","8530d4f4-d4ef-40f7-8fe0-74eeaee9f691","f7e58d8e-bf77-404d-bb86-df9629dae28e");