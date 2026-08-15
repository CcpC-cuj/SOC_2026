const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const messageService = require("./message.service");

const sendMessage = asyncHandler(async (req, res) => {

    const message =
        await messageService.sendMessage(
            req.user._id,
            req.body.conversationId,
            req.body.content
        );

    res.status(201).json(
        new ApiResponse(
            201,
            "Message sent successfully",
            message
        )
    );
});

const getMessages = asyncHandler(async (req, res) => {

    const messages =
        await messageService.getMessages(
            req.user._id,
            req.params.conversationId
        );

    res.status(200).json(
        new ApiResponse(
            200,
            "Messages fetched successfully",
            messages
        )
    );
});

module.exports = {
    sendMessage,
    getMessages
};