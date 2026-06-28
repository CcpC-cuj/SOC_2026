const User = require("../user/user.model");
const ApiError = require("../../utils/ApiError");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");
const fs = require("fs");

const getMyProfile = async (userId) => {

    const user = await User.findById(userId);
    return user;
};

const updateProfile = async(userId, profileData)=>{

        const {
            name,
            bio,
            branch,
            semester,
            skills,
            achievements,
            github,
            linkedin,
            portfolio
        } = profileData;

        const updateData = {//To not allow user to update password and email
            name,
            bio,
            branch,
            semester,
            skills,
            achievements,
            github,
            linkedin,
            portfolio
        };

    const user = await User.findByIdAndUpdate(userId, 
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    return user;
};

const uploadResume = async(userId, file)=>{

    if(!file) throw new ApiError(400, "Resume not found");

    try{
        const uploadRes = await uploadToCloudinary(file.path, "soc/resumes", "raw");

        const user = await User.findByIdAndUpdate(
            userId,
            {resumeUrl: uploadRes.secure_url},
            {new: true}
        );

        console.log(uploadRes);

        return user;
    }
    finally{
        if (file?.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
    }
}

const uploadAvatar = async(userId, file)=>{

    if(!file) throw new ApiError(400, "Avatar not found");

    if (!file.mimetype.startsWith("image/")) {
        throw new ApiError(
            400,
            "Only image files are allowed"
        );
    }

    try{
        const uploadRes = await uploadToCloudinary(file.path, "soc/avatars");

        const user = await User.findByIdAndUpdate(
            userId,
            {avatar: uploadRes.secure_url},
            {new: true}
        );

        console.log(uploadRes);

        return user;
    }
    finally{
        if (file?.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
    }
}

module.exports = {
    getMyProfile,
    updateProfile,
    uploadResume,
    uploadAvatar
};