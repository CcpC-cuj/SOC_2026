const asyncHandler = require("../../middleware/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const notificationService = require("./notification.service");

const getNotifications = asyncHandler(
    async (req, res) => {

        const notifications =
            await notificationService.getUserNotifications(
                req.user._id
            );

        res.status(200).json(
            new ApiResponse(
                200,
                "Notifications fetched successfully",
                notifications
            )
        );
    }
);

const getUnreadCount = asyncHandler(
    async (req, res) => {

        const count =
            await notificationService.getUnreadCount(
                req.user._id
            );

        res.status(200).json(
            new ApiResponse(
                200,
                "Unread count fetched successfully",
                { count }
            )
        );
    }
);

const markAsRead = asyncHandler(
    async (req, res) => {

        const notification =
            await notificationService.markAsRead(
                req.params.id,
                req.user._id
            );

        if (!notification) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    "Notification not found"
                )
            );
        }

        res.status(200).json(
            new ApiResponse(
                200,
                "Notification marked as read",
                notification
            )
        );
    }
);

const markAllAsRead = asyncHandler(
    async (req, res) => {

        await notificationService.markAllAsRead(
            req.user._id
        );

        res.status(200).json(
            new ApiResponse(
                200,
                "All notifications marked as read"
            )
        );
    }
);

module.exports = {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead
};