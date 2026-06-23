const express = require("express");
const router = express.Router();

const validate = require("../../middleware/validate.middleware");
const {registerSchema, loginSchema} = require("../../validations/auth.validation");
const authMiddleware = require("../../middleware/auth.middleware");
const authController = require("./auth.controller");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
