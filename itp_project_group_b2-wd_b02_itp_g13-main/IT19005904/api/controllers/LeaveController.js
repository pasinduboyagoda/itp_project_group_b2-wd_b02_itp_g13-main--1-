const LeaveService = require("../services/LeaveService");

module.exports={
    apply_leave_view : function(req,res){
        return res.view('partials/applyLeave',
                        {	
                            layout:"template"
                        }
                    );
    },
    apply_leave : function(req,res){
        console.log(req.body)
		if(!req.body.leaveType    || !req.body.fromDate || !req.body.toDate){
            return res.view('partials/applyLeave',
                        {	
                            layout:"template", 
                            status:"error",
                            message:"Leave Type, Leave Start Date, Leave End Date is required"
                        }
                    );
        }
        let leaveData = {
            employee:req.emp.id,
            type:req.body.leaveType,
            status:"PENDING",
            fromDate:req.body.fromDate,
            toDate:req.body.toDate
        }

        return LeaveService.createLeave(leaveData,function(err,leave){
                if(err){
                    return res.view('partials/applyLeave',
                        {	
                            layout:"template", 
                            status:"error",
                            message: err.message
                        }
                    );
                } else
                return res.view('partials/applyLeave',
                {	
                    layout:"template", 
                    status:"success",
                    message: "Applied Successfully"
                }
            );
        });
	},

    


    my_leaves : async function(req,res){
        let pendingLeaves = await Leaves.find({status:'PENDING',employee:req.emp.id});
        let sickLeaves = await LeaveService.getAvailableLeaves(req.emp.id,"SICK_LEAVE");
        let casualLeaves = await LeaveService.getAvailableLeaves(req.emp.id,"CASUAL_LEAVE");
        let studyLeaves = await LeaveService.getAvailableLeaves(req.emp.id,"STUDY_LEAVE");
        return  res.view('partials/manageLeaveTypes',
            {	
                layout:"template", 
                data:{
                    leaves:pendingLeaves,
                    sickLeaveAvailable:sickLeaves.balance,
                    casualLeaveAvailable:casualLeaves.balance,
                    studyLeaveAvailable:studyLeaves.balance
                }
            }
        );
    },

    
    deleteLeave: async function(req,res){
        let leaveId = req.params.leaveId;
        let leave =  await LeaveService.deleteLeave(leaveId,req.emp.id);
        if(leave.err)
            return res.view('partials/manageLeaveTypes',
                {	
                    layout:"template", 
                    status:"error-persistent",
                    message: leave.err + "Click <a href='/my_leaves'>here</a>"
                }
            );
        return res.redirect("/my_leaves")

    }
};