const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const resourceRoutes = require("../modules/resource/resource.routes");

router.use("/auth", authRoutes);
router.use("/resources", resourceRoutes);

module.exports = router;