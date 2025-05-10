// server/routes/StudentNavbarRoute.js

const express = require('express');
const { generateOtpAndSend, verifyOtp, verifyOldPassword, changePassword } = require('../controllers/StudentNavbar/passwordController');
const sendOtpToStudent = require('../controllers/StudentNavbar/sendOtpController');
const router = express.Router();

// Route to generate and send OTP
router.post('/api/generate-otp', generateOtpAndSend);

router.post('/api/send-otp',sendOtpToStudent)

// Route to verify OTP entered by the user
router.post('/api/verify-otp',verifyOtp);

// Route to verify old password before changing it
router.post('/api/verify-old-password',verifyOldPassword);

// Route to change password after successful OTP or old password verification
router.post('/api/change-password', changePassword);

module.exports = router;
