const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const resourceRoutes = require("../modules/resource/resource.routes");
const profileRoutes = require("../modules/profile/profile.routes");

router.use("/auth", authRoutes);
router.use("/resources", resourceRoutes);
router.use("/profile", profileRoutes);

module.exports = router;