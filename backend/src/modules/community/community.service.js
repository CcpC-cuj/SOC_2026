const Community = require("./community.model");
const ApiError = require("../../utils/ApiError");

const createPost = async (userId, postData) => {

    const post = await Community.create({
        ...postData,
        author: userId
    });

    return post;
    
};

const deletePost = async(postId, usearId, role)=>{

    const post = await Community.findById(postId);

    if(!post){
        throw new ApiError(404, "Post not found!");
    }

    if(post.author.toString() !== userId.toString() && role!=="admin"){
        throw new ApiError(403, "Not authorised to delete this post");
    }

    await post.deleteOne();
}

const toggleUpvote = async (postId, userId) => {

    const post = await Community.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const alreadyUpvoted = post.upvotes.includes(userId);

    if (alreadyUpvoted) {

        post.upvotes.pull(userId);

    } else {

        post.upvotes.push(userId);

        post.downvotes.pull(userId);

    }

    await post.save();

    return post;

};

const toggleDownvote = async (postId, userId) => {

    const post = await Community.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const alreadyDownvoted =
        post.downvotes.includes(userId);

    if (alreadyDownvoted) {

        post.downvotes.pull(userId);

    } else {

        post.downvotes.push(userId);

        post.upvotes.pull(userId);

    }

    await post.save();

    return post;

};

const getAllPosts = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([

        Community.find()
            .populate("author", "name avatar")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Community.countDocuments()

    ]);

    return {

        posts,

        pagination: {

            page,

            limit,

            totalPosts,

            totalPages: Math.ceil(totalPosts / limit)

        }

    };

};

module.exports = {
    createPost,
    deletePost,
    toggleUpvote,
    toggleDownvote,
    getAllPosts
};