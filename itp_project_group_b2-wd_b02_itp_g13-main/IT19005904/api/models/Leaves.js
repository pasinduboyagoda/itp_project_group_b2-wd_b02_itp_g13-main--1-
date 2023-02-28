const uuid = require('node-uuid');

module.exports = {


	attributes: {
        id:{
			type:'string',
			defaultsTo:uuid.v4,
			primaryKey:true

		},
        type: {
			model:'leavetype'
		},
        employee: {
			model:'employee'
		},
        status:{
            type:'string'
        },
        fromDate:{
            type:'string'   
        },
        toDate:{
            type:'string'
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