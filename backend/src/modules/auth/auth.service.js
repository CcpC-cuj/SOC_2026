const ApiError = require("../../utils/ApiError");
const User = require("../user/user.model");
const {generateToken} = require("../../utils/jwt");

const registerUser = async(userData)=>{
    
    const existingUser = await User.findOne({
        email: userData.email
    });

    if(existingUser){
        throw new ApiError(404, "User already exist");
    }

    const user = await User.create(userData);

    const token = generateToken(user._id);

    user.password = undefined;
    return{
        user,
        token
    };
};

const loginUser = async(email, password)=>{

    const user = await User.findOne({email}).select("+password");

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

module.exports = {
    registerUser,
    loginUser
};