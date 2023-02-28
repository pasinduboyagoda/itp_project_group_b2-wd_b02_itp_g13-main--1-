const uuid = require('node-uuid');

module.exports = {

	attributes: {
		id:{
			type:'string',
			defaultsTo:uuid.v4,
			primaryKey:true

		},
		type: {
			type: 'string',
			required: true,
			unique: true
		},
    
		employee: {
			collection: 'leaves',
			via: 'type'
		},
		toJSON: function () {
			var obj = this.toObject();
			return obj;
		}
	},
	beforeCreate: function (values, next) {
		next();
	},

};