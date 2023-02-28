const { timingSafeEqual } = require('crypto');
const uuid = require('node-uuid');
const CipherService = require('../services/CipherService');

module.exports = {
	attributes: {
		id:{
			type:'string',
			defaultsTo:uuid.v4,
			primaryKey:true
		},
		email: {
			type: 'string',
			unique: true,
			required: true,
		},
		name: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
		role: {
			model:'role'
		},
		leaves: {
            collection: 'leaves',
            via: 'employee'
        },
		balanceLeaves:{
			collection: 'leaves',
            via: 'employee'
		},
		toJSON: function () {
			var obj = this.toObject();
			return obj;
		}
		
	},

    
    
	beforeCreate: function (values, next) {
		this.password = CipherService.hashPassword(values);
		next();
	},

	beforeDestroy: async function (criteria, next) {
		
		next();
	},

	beforeUpdate: async function (values, next) {
		next();
	},
};