const User = require("../user/user.model");
const Resource = require("../resource/resource.model");
const PYQ = require("../pyq/pyq.model");
const ApiError = require("../../utils/ApiError");

const getDashboard = async () => {

    const [
        totalUsers,
        totalResources,
        totalPyqs,
        pendingResources,
        pendingPyqs
    ] = await Promise.all([

        User.countDocuments(),

        Resource.countDocuments(),

        PYQ.countDocuments(),

        Resource.countDocuments({
            approved: false
        }),

        PYQ.countDocuments({
            approved: false
        })

    ]);

    return {

        totalUsers,

        totalResources,

        totalPyqs,

        totalPendingApprovals:
            pendingResources + pendingPyqs,

    };

};

const getAllResumes = async () => {

    const users = await User.find({
        resumeUrl: {
            $exists: true,
            $ne: ""
        }
    })
    .select(
        "name rollNumber semester resumeUrl avatar createdAt bio skills"
    )
    .sort({
        createdAt: -1
    });

    console.log(users);
    return users;

};

const getPendingPyqs = async () => {

    return await PYQ.find({ approved: false })
        .populate("uploadedBy", "name avatar rollNumber semester bio skills")
        .sort({ createdAt: -1 });

};

const approvePyq = async (pyqId) => {

    const pyq = await PYQ.findById(pyqId);

    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    if (pyq.approved) {
        throw new ApiError(400, "PYQ already approved");
    }
    

    pyq.approved = true;

    await pyq.save();

    await User.findByIdAndUpdate(
        pyq.uploadedBy,
        {
            $inc: {
                contributionScore: 1
            }
        }
    );

    return pyq;

};

const deletePyq = async (pyqId) => {

    const pyq = await PYQ.findById(pyqId);

    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    await pyq.deleteOne();

    return;

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
    await User.findByIdAndUpdate(
        resource.uploadedBy,
        {
            $inc: {
                contributionScore: 1
            }
        }
    );
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
    }).populate("uploadedBy", "name avatar rollNumber semester bio skills")
    .sort({createdAt: -1});

    return resources;
}



module.exports = {
    getDashboard,
    getAllResumes,
    getPendingPyqs,
    approvePyq,
    deletePyq,
    approveResource,
    deleteResource,
    getPendingResources
};