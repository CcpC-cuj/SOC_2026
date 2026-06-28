const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (
    filePath,
    folder,
    resourceType = "auto"
) => {

    const result =
        await cloudinary.uploader.upload(
            filePath,
            {
                folder,
                resource_type: resourceType
            }
        );

    return result;
};

module.exports = uploadToCloudinary;