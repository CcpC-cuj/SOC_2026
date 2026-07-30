const User = require("../user/user.model");

const Resource = require("../resource/resource.model");
const Community = require("../community/community.model");


const getDashboard = async (userId) => {
    const [user, 
        totalUploads, 
        approvedUploads,
        pendingUploads,
        recentUploads,
        recentPosts

    ] = await Promise.all([
        User.findById(userId)
        .select("-password"),

    Resource.countDocuments({
        uploadedBy: userId
    }),

    Resource.countDocuments({
        uploadedBy: userId,
        approved: true
    }),

    Resource.countDocuments({
        uploadedBy: userId,
        approved: false
    }),

    Resource.find({
        uploadedBy: userId
    })
    .sort({
        createdAt: -1
    })
    .limit(5),

    Community.find()
    .sort({createdAt: -1})
    .limit(5)
    .populate("author", "name")

    ]);


    return{
        profile: user,
        stats:{
            totalUploads,
            approvedUploads,
            pendingUploads
        },
        recentUploads,
        recentPosts
    }
};


module.exports={
    getDashboard
}