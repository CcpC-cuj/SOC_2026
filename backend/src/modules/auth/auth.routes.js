const express = require("express");
const router = express.Router();

const validate = require("../../middleware/validate.middleware");
const {registerSchema, loginSchema, sendRegistrationOtpSchema, verifyRegistrationOtpSchema} = require("../../validations/auth.validation");
const authController = require("./auth.controller");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

router.post("/send-registration-otp", validate(sendRegistrationOtpSchema), authController.sendRegistrationOtp);

router.post("/verify-registration-otp", validate(verifyRegistrationOtpSchema), authController.verifyRegistrationOtp);

module.exports = router;
