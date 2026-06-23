const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (fileBuffer)=>{

    return new Promise((reslove, reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "soc/resources",
                resource_type: "raw"
            },
            (error, result)=>{
                if(error) reject(error);
                reslove(result);
            }
        );

        streamifier.createReadStream(fileBuffer)
        .pipe(stream);
    });
};

module.exports =uploadToCloudinary;
