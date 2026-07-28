const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");

const communityController = require("./community.controller");

const {
    createPostSchema
} = require("../../validations/community.validation");

router.get("/",
    communityController.getAllPosts
);

router.post(
    "/",
    authMiddleware,
    validate(createPostSchema),
    communityController.createPost
);

router.delete(
    "/:id",
    authMiddleware,
    communityController.deletePost
);

router.patch(
    "/:id/upvote",
    authMiddleware,
    communityController.toggleUpvote
);

router.patch(
    "/:id/downvote",
    authMiddleware,
    communityController.toggleDownvote
);

module.exports = router;