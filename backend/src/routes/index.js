const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const resourceRoutes = require("../modules/resource/resource.routes");
const profileRoutes = require("../modules/profile/profile.routes");
const dashboardRoutes = require("../modules/dashboard/dashboard.routes");
const pyqRoutes = require("../modules/pyq/pyq.routes");
const communityRoutes = require("../modules/community/community.routes");
const projectRoutes = require("../modules/project/project.Routes");
const adminRoutes = require("../modules/admin/admin.routes");
const messageRoutes = require("../modules/message/message.routes");
const conversationRoutes = require("../modules/conversation/conversation.routes");

router.use("/auth", authRoutes);
router.use("/resources", resourceRoutes);
router.use("/profile", profileRoutes);
router.use("/dashboard",dashboardRoutes);
router.use("/projects", projectRoutes);
router.use("/pyqs",pyqRoutes);
router.use("/community", communityRoutes);
router.use("/admin", adminRoutes);
router.use("/messages", messageRoutes);
router.use("/conversations", conversationRoutes);


module.exports = router;