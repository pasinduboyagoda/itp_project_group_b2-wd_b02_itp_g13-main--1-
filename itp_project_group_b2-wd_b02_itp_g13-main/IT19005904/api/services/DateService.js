module.exports={

    toDate : function(str){
        const [year, month, day] = str.split('-');
        return new Date(+year, month - 1, +day);
    },
    dateDiffInMillis : function(date1,date2){
        let sDate = this.toDate(date1);
        let eDate = this.toDate(date2);
        return Math.abs(sDate - eDate);
    },

    dateDiffInDays : function(date1,date2){
        return Math.ceil(this.dateDiffInMillis(date1,date2)/(1000*60*60*24))
    }
};