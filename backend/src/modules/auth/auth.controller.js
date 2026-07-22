const authService = require("./auth.service");
const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const register = asyncHandler(async(req, res)=>{

    const user = await authService.registerUser(req.body);

    res.status(201).json(
        new ApiResponse(201, "User Registered Successfully", user)
    );
});

const login = asyncHandler(async(req, res)=>{

    const {rollNumber, password} = req.body;
    const user = await authService.loginUser(rollNumber, password);

    res.status(200).json(
        new ApiResponse(201, "User Logged in Successfully", user)
    );
});


module.exports = {
    register,
    login
};