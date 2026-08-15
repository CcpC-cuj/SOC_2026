const express = require("express");

const router = express.Router();

const notificationController =
    require("./notification.controller");

const authMiddleware =
    require("../../middleware/auth.middleware");

router.get(
    "/",
    authMiddleware,
    notificationController.getNotifications
);

router.get(
    "/unread-count",
    authMiddleware,
    notificationController.getUnreadCount
);

router.patch(
    "/:id/read",
    authMiddleware,
    notificationController.markAsRead
);

router.patch(
    "/read-all",
    authMiddleware,
    notificationController.markAllAsRead
);

module.exports = router;