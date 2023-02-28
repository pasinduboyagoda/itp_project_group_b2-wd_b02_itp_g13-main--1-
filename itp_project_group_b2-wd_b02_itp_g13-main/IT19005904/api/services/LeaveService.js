module.exports = {
    createLeave : async function(leaveData,cb){
        let balanceLeaves = await this.getAvailableLeaves(leaveData.employee,leaveData.type)
        if(!balanceLeaves)
            return cb({message:"Error fetching Balance leaves for "+leaveData.employee},null);
        let totalDays = DateService.dateDiffInDays(leaveData.toDate,leaveData.fromDate)+1
        if(totalDays<0){
            return cb({message:"Can not apply in past"},null);
        }
        else if(parseInt(balanceLeaves.balance)>=totalDays){
            let leave
            try{
                leave  = await Leaves.create(leaveData);
            } catch (err){
                return cb({message:"Error Creating Leave"}, {});
            }
            await setAvailableLeaves(leaveData.employee,leaveData.type,parseInt(balanceLeaves.balance)-totalDays)
            return cb(null, leave);

        }else {
            return cb({message:"No available leaves for type " +leaveData.type},null);
        }
    },

    deleteLeave : async function(leaveId,empId){
        let leave = await Leaves.findOne({id:leaveId});
        if(!leave)
            return {err:"Leave not found",leave : null};
        if(leave.status!="PENDING")
            return {err:"Leave already Processed",leave : null};
        if(leave.employee!=empId)
            return {err:"Not raised by you",leave : null};
        let totalDays = DateService.dateDiffInDays(leave.toDate,leave.fromDate)+1
        let deletedLeave = await Leaves.destroy({id:leaveId}).populate('type')
        if(!deletedLeave)
            return {err:"Error Deleting Leave",leave : null}
        let balanceLeaves = await this.getAvailableLeaves(deletedLeave[0].employee,deletedLeave[0].type)
        let updatedBalance = await setAvailableLeaves(deletedLeave[0].employee,deletedLeave[0].type,parseInt(balanceLeaves.balance)+totalDays)
        if(!updatedBalance)
            return {err:"Error Updating Balance Leaves",leave : null}
        return {err:null,leave:leave};
    },

    populateBalanceLeaves: async function (empId){
        let sickLeave = await Leavetype.findOne({type:"SICK_LEAVE"});
        let casualLeave = await Leavetype.findOne({type:"CASUAL_LEAVE"});
        let studyLeave = await Leavetype.findOne({type:"STUDY_LEAVE"});
        try{
            let balanceSickLeaves = await Balanceleaves.create({type:sickLeave.id,employee:empId,balance:process.env.sickLeave});
            let balanceCasualLeaves = await Balanceleaves.create({type:casualLeave.id,employee:empId,balance:process.env.casualLeave});
            let balanceStudyLeaves = await Balanceleaves.create({type:studyLeave.id,employee:empId,balance:process.env.studyLeave});
            return [balanceSickLeaves,balanceCasualLeaves,balanceStudyLeaves];
        } catch (err){
            console.log(err)
            deleteEmployee(empId)
            return null; 
        }
    },
    getAvailableLeaves: async function (empId,type){
        let leaveType = await Leavetype.findOne({type:type});
        let balanceLeaves = await Balanceleaves.findOne({type:leaveType.id,employee:empId});
        if(!balanceLeaves)
            return null
        return balanceLeaves;
    }
};




async function setAvailableLeaves(empId,type,balance){
    let leaveType = await Leavetype.findOne({type:type});

    let balanceLeaves;
    try{
     balanceLeaves = await Balanceleaves.update({type:leaveType.id,employee:empId}).set({balance:balance});
    } catch (err){
        console.log(err)
    }
    return balanceLeaves[0].balance;
}

