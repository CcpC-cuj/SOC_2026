const Conversation = require("./conversation.model");
const ApiError = require("../../utils/ApiError");

const getOrCreateConversation = async (
    userId,
    otherUserId
) => {

    if (userId.toString() === otherUserId.toString()) {
        throw new ApiError(
            400,
            "You cannot start a conversation with yourself"
        );
    }

    let conversation =
        await Conversation.findOne({
            participants: {
                $all: [
                    userId,
                    otherUserId
                ],
                $size: 2
            }
        });

    if (conversation) {
        return conversation;
    }

    conversation = await Conversation.create({
        participants: [
            userId,
            otherUserId
        ]
    });

    return conversation;
};

const getUserConversations = async (userId) => {

    const conversations = await Conversation.find({
        participants: userId
    })
        .populate("participants", "name email")
        .populate({
            path: "lastMessage",
            populate: {
                path: "sender",
                select: "name email"
            }
        })
        .sort({ updatedAt: -1 });

    return conversations;
};

module.exports = {
    getOrCreateConversation,
    getUserConversations
};