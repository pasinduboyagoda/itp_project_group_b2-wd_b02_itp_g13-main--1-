const uuid = require('node-uuid');

module.exports = {
//create table balanceleaves(id char(36), type char(36),employee char(36), balance int);

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
        balance: {
            type: 'string'
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