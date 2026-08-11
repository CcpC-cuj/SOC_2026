const authService = require("./auth.service");
const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const login = asyncHandler(async(req, res)=>{

    const {rollNumber, password} = req.body;
    const user = await authService.loginUser(rollNumber, password);

    res.status(200).json(
        new ApiResponse(201, "User Logged in Successfully", user)
    );
});

const sendRegistrationOtp = asyncHandler(async(req, res)=>{

    await authService.sendRegisterOtp(req.body);
    res.status(200).json(
        new ApiResponse(200, "OTP sent successfully")
    );

});

const verifyRegistrationOtp =asyncHandler(async(req, res)=>{
    const {email, otp} = req.body;

    const user = await authService.verifyRegistrationOtp(email, otp);
    res.status(201).json(
        new ApiResponse(201, "Registration successful", user)
    );

});


module.exports = {
    login,
    sendRegistrationOtp,
    verifyRegistrationOtp,
};