require('dotenv').config()
module.exports = {

    createEmployee : async function(empData,cb){
        let emp;
        try{
            emp =  await Employee.create(empData);
        } catch (err){
            console.log(error)
            return cb({message:"Error creating Employee"}, null);
        }
        let leaves = await LeaveService.populateBalanceLeaves(emp.id)
        if(!leaves){       
            deleteEmployee(emp.id)
            return cb({message:"Error populating inital balance"}, null);
        }
        else
            return cb(null,emp)
    }

};


function deleteEmployee(empId){
    try{
        Employee.destroy({id:empId});
    }catch (err){
        console.log(err)
    }
}
