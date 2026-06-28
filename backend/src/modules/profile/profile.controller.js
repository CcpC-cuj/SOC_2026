const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const profileService =require("./profile.service");

const getMyProfile = asyncHandler(async(req, res)=>{

    const user = await profileService.getMyProfile(req.user._id);
    res.status(200).json(new ApiResponse(
        200,
        "Profile Fetched successfully",
        user
    ));
});

const updateProfile = asyncHandler(async(req, res)=>{

    const user = await profileService.updateProfile(req.user._id, req.body);
    res.status(200).json(new ApiResponse(
        200,
        "Profile Updated Successfully",
        user
    ));
});

const uploadResume = asyncHandler(async(req, res)=>{
    const user = await profileService.uploadResume(req.user._id, req.file);

    res.status(200).json(new ApiResponse(200, "Resume Uploaded Successfully", user));

});

const uploadAvatar = asyncHandler(async(req, res)=>{
    const user = await profileService.uploadAvatar(req.user._id, req.file);

    res.status(200).json(new ApiResponse(200, "Avatar Uploaded Successfully", user));

});

module.exports ={
    getMyProfile,
    updateProfile,
    uploadResume,
    uploadAvatar
}