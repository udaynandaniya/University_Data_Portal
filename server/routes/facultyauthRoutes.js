const express = require("express");
const router = express.Router();
const { setOtp, verifyOtp } = require('../Mail_manage/otpStore');

const { forgotPassword, resetPassword } = require("../controllers/facultyauthController");

// Faculty Forgot Password Route (Sends OTP to faculty email)
router.post("/forgot-password", forgotPassword);

// Faculty OTP Verification Route (Verify OTP for faculty)
router.post("/verify-otp", verifyOtp);

// Faculty Reset Password Route (Resets faculty password after OTP is verified)
router.post("/reset-password", resetPassword);

module.exports = router;
