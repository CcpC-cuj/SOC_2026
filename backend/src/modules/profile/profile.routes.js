const express = require("express");

const router = express.Router();

const validate = require("../../middleware/validate.middleware");
const updateProfileSchema=  require("../../validations/profile.validation");
const authMiddleware = require("../../middleware/auth.middleware");
const profileController = require("./profile.controller");
const upload = require("../../middleware/upload.middleware");

router.get("/me",authMiddleware, profileController.getMyProfile);

router.patch("/", authMiddleware, validate(updateProfileSchema), profileController.updateProfile);
router.patch("/resume", authMiddleware, upload.single("resume"), profileController.uploadResume);
router.patch("/avatar", authMiddleware, upload.single("avatar"), profileController.uploadAvatar);


module.exports = router;