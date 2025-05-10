
const express = require('express');
const router = express.Router();

const { verifyEnrollment } = require('../controllers/verificationController');
const verifyOtp = require('../Mail_manage/verifyOtp');

// const {verifyDeletionOtp} = require('../controllers/verifyDeletionOtp');
const generateCredentials = require('../Mail_manage/generateCredentials');


console.log("\n routes=> => verifyEnrollment.js => verifyEnrollmentfn")

console.log("verifyEnrollment type:", typeof verifyEnrollment);       // should be 'function'
console.log("verifyOtp type:", typeof verifyOtp);                     // should be 'function'
   // should be 'function'
console.log("generateCredentials type:", typeof generateCredentials); // should be 'function'

// Route to send OTP to email
router.post('/verify', verifyEnrollment);

console.log("\n routes=> => verfyotpfn")

// Route to verify OTP
router.post('/otp', verifyOtp);

// router.post('/verify-otp-delete', verifyDeletionOtp);

// Define the route for generating credentials
router.post('/generate-credentials',generateCredentials );
module.exports = router;
