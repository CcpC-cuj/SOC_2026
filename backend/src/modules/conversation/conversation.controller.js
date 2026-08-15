const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const conversationService = require("./conversation.service");

const getOrCreateConversation = asyncHandler(
    async (req, res) => {

        const conversation =
            await conversationService.getOrCreateConversation(
                req.user._id,
                req.body.userId
            );

        res.status(200).json(
            new ApiResponse(
                200,
                "Conversation ready",
                conversation
            )
        );
    }
);

const getUserConversations = asyncHandler(
    async (req, res) => {

        const conversations =
            await conversationService.getUserConversations(
                req.user._id
            );

        res.status(200).json(
            new ApiResponse(
                200,
                "Conversations fetched successfully",
                conversations
            )
        );
    }
);

module.exports = {
    getOrCreateConversation,
    getUserConversations,
};