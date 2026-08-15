const express = require("express");

const router = express.Router();

const conversationController =
    require("./conversation.controller");

const authMiddleware =
    require("../../middleware/auth.middleware");

router.get("/",
    authMiddleware,
    conversationController.getUserConversations
);

router.post(
    "/",
    authMiddleware,
    conversationController.getOrCreateConversation
);

module.exports = router;