const uuid = require('node-uuid');

module.exports = {

	attributes: {
		id:{
			type:'string',
			defaultsTo:uuid.v4,
			primaryKey:true

		},
		role: {
			type: 'string',
			required: true,
			unique: true
		},
		toJSON: function () {
			var obj = this.toObject();
			return obj;
		}
        
	},
   
	beforeCreate: function (modelObj, next) {
		next();
	  }
};