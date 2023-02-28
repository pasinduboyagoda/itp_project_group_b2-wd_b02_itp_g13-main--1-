module.exports = function (req, res, next) {
        if(!req.emp){
            res.badRequest("Please login");
        }
        else if(req.emp.role!="ADMIN"){
            res.forbidden("You are not an admin")
        }
        else
            next()
}; 