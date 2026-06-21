const ApiError = require("../utils/ApiError");
const validate = (schema) => {

    return (req, res, next) => {

        const result =
        schema.safeParse(req.body);

        if(!result.success){

            const errors =
            result.error.issues.map(
                issue => issue.message
            );

            throw new ApiError(
                400,
                errors[0],
                errors
            );
        }

        req.body = result.data;

        next();
    };

};

module.exports = validate;