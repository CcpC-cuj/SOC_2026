const express = require("express");

const router = express.Router();

const messageController =
    require("./message.controller");

const authMiddleware =
    require("../../middleware/auth.middleware");

router.post(
    "/",
    authMiddleware,
    messageController.sendMessage
);

router.get(
    "/:conversationId",
    authMiddleware,
    messageController.getMessages
);

module.exports = router;