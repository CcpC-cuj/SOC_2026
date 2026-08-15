const Message = require("./message.model");
const Conversation = require("../conversation/conversation.model");
const ApiError = require("../../utils/ApiError");

const sendMessage = async (
    userId,
    conversationId,
    content
) => {

    if (!content || !content.trim()) {
        throw new ApiError(
            400,
            "Message cannot be empty"
        );
    }

    const conversation =
        await Conversation.findOne({
            _id: conversationId,
            participants: userId
        });

    if (!conversation) {
        throw new ApiError(
            403,
            "You are not a member of this conversation"
        );
    }

    const message = await Message.create({
        conversation: conversationId,
        sender: userId,
        content: content.trim()
    });

    conversation.lastMessage = message._id;

    await conversation.save();

    return await Message.findById(message._id)
        .populate("sender", "name email");
};

const getMessages = async (
    userId,
    conversationId
) => {

    const conversation =
        await Conversation.findOne({
            _id: conversationId,
            participants: userId
        });

    if (!conversation) {
        throw new ApiError(
            403,
            "You are not a member of this conversation"
        );
    }

    const messages = await Message.find({
        conversation: conversationId
    })
        .populate("sender", "name email")
        .sort({ createdAt: 1 });

    return messages;
};

module.exports = {
    sendMessage,
    getMessages
};