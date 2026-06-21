const ApiError = require("../utils/ApiError");

const authorize = (...roles) => {

    return (req, res, next) => {

        if(!roles.includes(req.user.role)){
            
            throw new ApiError(
                403,
                "Forbidden"
            );
            
        }

        next();
    };

};

module.exports = authorize;