const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const communityService = require("./community.service");

const createPost = asyncHandler(async (req, res) => {

    const post = await communityService.createPost(
        req.user._id,
        req.body
    );

    res.status(201).json(
        new ApiResponse(
            201,
            "Post created successfully",
            post
        )
    );

});

const deletePost = asyncHandler(async (req, res) => {

    await communityService.deletePost(
        req.params.id,
        req.user._id,
        req.user.role
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Post deleted successfully"
        )
    );

});

const toggleUpvote = asyncHandler(async (req, res) => {

    const post =
        await communityService.toggleUpvote(
            req.params.id,
            req.user._id
        );

    res.status(200).json(

        new ApiResponse(

            200,

            "Vote updated successfully",

            post

        )

    );

});

const toggleDownvote = asyncHandler(async (req, res) => {

    const post =
        await communityService.toggleDownvote(
            req.params.id,
            req.user._id
        );

    res.status(200).json(

        new ApiResponse(

            200,

            "Vote updated successfully",

            post

        )

    );

});

const getAllPosts = asyncHandler(async (req, res) => {

    const result = await communityService.getAllPosts(req.query);

    res.status(200).json(
        new ApiResponse(
            200,
            "Posts fetched successfully",
            result

        )
    );

});


module.exports = {
    createPost,
    deletePost,
    toggleUpvote,
    toggleDownvote,
    getAllPosts
};