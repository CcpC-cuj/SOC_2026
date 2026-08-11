const ApiError = require("../../utils/ApiError");
const User = require("../user/user.model");
const {generateToken} = require("../../utils/jwt");
const bcrypt = require("bcryptjs");
const OTP = require("./otp.model");
const sendEmail = require("../../utils/sendEmail");

const loginUser = async(rollNumber, password)=>{

    const user = await User.findOne({rollNumber}).select("+password");

    if(!user){
        throw new ApiError(401, "Invalid Credentials!");
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        throw new ApiError(401, "Invalid Credentials!");
    }

    const token = generateToken(user._id);
    user.password = undefined;
    return{
        user,
        token
    };
};

const generateOtp = () => {

    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();

};

const sendRegisterOtp = async(registrationData)=>{
    const{
        name, 
        email,
        password,
        semester,
        rollNumber,
        collegeEmail
    } = registrationData;

    const existingEmail = await User.findOne({email});
    const existingRoll = await User.findOne({rollNumber});

    if(existingEmail || existingRoll){
        throw new ApiError(409, "User already exist");
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await OTP.deleteMany({email});

    await OTP.create({
        email,
        otp: hashedOtp,
        registrationData,
        expiresAt: new Date(Date.now(0)+10*60*1000)
    });

    await sendEmail({
        to: email,
        subject: "OTP for Student Platform",
        text: `Your registration OTP is ${otp}`
    });

};

const verifyRegistrationOtp = async (email, enteredOtp) => {

    const otpRecord = await OTP.findOne({email});

    if (!otpRecord) {
        throw new ApiError(400, "OTP expired");
    }

    if (otpRecord.expiresAt < new Date()) {
        await otpRecord.deleteOne();

        throw new ApiError(400, "OTP expired");
    }

    if (otpRecord.attempts >= 5) {

        await otpRecord.deleteOne();

        throw new ApiError(429, "Too many OTP attempts");
    }

    const validOtp =
        await bcrypt.compare(
            enteredOtp,
            otpRecord.otp
        );

    if (!validOtp) {
        otpRecord.attempts += 1;
        await otpRecord.save();
        throw new ApiError(400, "Invalid OTP");
    }

    const user = await User.create(
        otpRecord.registrationData
    );

    const token = generateToken(user._id);

    user.password = undefined;

    await otpRecord.deleteOne();

    return {
        user,
        token
    };
};

module.exports = {
    loginUser,
    sendRegisterOtp,
    verifyRegistrationOtp
};