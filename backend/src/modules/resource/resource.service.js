const Resource = require("./resource.model");
const ApiError = require("../../utils/ApiError");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");
const fs = require("fs");

const createResource = async(resourceData, file, userId) =>{

    if(!file){
        throw new ApiError(
            400,
            "PDF file is required"
        );
    }

    try{
        const uploadResult = await uploadToCloudinary(
            file.path,
            "soc/resources",
            "raw"
        );
        console.log(uploadResult);
    
        const resource = await Resource.create({
            ...resourceData, 
            fileUrl: uploadResult.secure_url,
            originalFileName:file.originalname,
            uploadedBy: userId
        });
    
        return resource;
    }
    finally{
        if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
        }
    }
};

const getAllResources = async(page, limit, search, subject, semester, tag, faculty)=>{

    const filter = {
        approved: true
    };

    if(search){
        filter.$or =[
            {
                title:{
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description:{
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    if(subject){
        filter.subject = subject;
    }
    if(semester){
        filter.semester = semester;
    }
    if(tag){
        filter.tags = tag.toLowerCase();
    }
    if(faculty){
    filter["faculty.name"] = {
        $regex: faculty,
        $options: "i"
    };
}

    const skip = (page-1)*limit;

    const totalResources = await Resource.countDocuments(filter);

    const resources = await Resource.find(filter)
    .populate("uploadedBy", "name email")
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit);

    return {
        resources,
        totalResources
    };
};

const getResourceById = async(id)=>{

    const resource = await Resource.findOne({
        _id: id,
        approved: true
    }).populate("uploadedBy", "name email");

    if (!resource) {
        throw new ApiError(404, "Resource not found!");
    }

    return resource;
};

const approveResource = async(id)=>{
    const resource = await Resource.findById(id);

    if(!resource) {
        throw new ApiError(404, "Resource not found!");
    }

    if (resource.approved) {
        throw new ApiError(400, "Resource already approved!");
    }

    resource.approved = true;
    await resource.save();
    return resource;
};

const deleteResource = async(id)=>{

    const resource = await Resource.findById(id);
    if(!resource){
        throw new ApiError(404, "Resource not found!");
    }

    await Resource.findByIdAndDelete(id);

    return resource;
}

const getPendingResources = async()=>{

    const resources = await Resource.find({
        approved: false
    }).populate("uploadedBy", "name email")
    .sort({createdAt: -1});

    return resources;
}

module.exports = {
    createResource,
    getAllResources,
    getResourceById,
    approveResource,
    deleteResource,
    getPendingResources
};