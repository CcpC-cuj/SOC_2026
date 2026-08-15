const Notification = require("./notification.model");

const createNotification = async ({
    recipient,
    type,
    title,
    message,
    referenceId = null,
    referenceType = null
}) => {

    return await Notification.create({
        recipient,
        type,
        title,
        message,
        referenceId,
        referenceType
    });
};

const getUserNotifications = async (userId) => {

    return await Notification.find({
        recipient: userId
    })
        .sort({ createdAt: -1 });
};

const getUnreadCount = async (userId) => {

    return await Notification.countDocuments({
        recipient: userId,
        read: false
    });
};

const markAsRead = async (
    notificationId,
    userId
) => {

    return await Notification.findOneAndUpdate(
        {
            _id: notificationId,
            recipient: userId
        },
        {
            read: true
        },
        {
            new: true
        }
    );
};

const markAllAsRead = async (userId) => {

    return await Notification.updateMany(
        {
            recipient: userId,
            read: false
        },
        {
            read: true
        }
    );
};

module.exports = {
    createNotification,
    getUserNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead
};