const express = require("express");
const router = express.Router();

const {
  verifyFacultyEmail} = require("../controllers/facultyVerificationController");
const verifyOtp = require('../Mail_manage/verifyOtp');

const generateCredentials = require('../Mail_manage/generateCredentials');

const { registerFaculty, loginFaculty, } = require("../controllers/facultyController");

console.log("\n routes=> => facultyRoutes.js ")

// 📧 Step 1: Faculty Email Verification (Check in FacultyData.json + Send OTP)
router.post("/verify-faculty/email", verifyFacultyEmail);

// 🔐 Step 2: OTP Verification
router.post("/verify-faculty/otp", verifyOtp);

// 📝 Step 3: Faculty Registration
router.post("/faculty/register", registerFaculty);

// 🔓 Step 4: Faculty Login
router.post("/faculty/login", loginFaculty);

console.log("\n✅ facultyRoutes.js is loaded");

router.post('/verify-faculty/generate-credentials',generateCredentials );
module.exports = router;
















// const express = require("express");
// const router = express.Router();

// // Controllers for Faculty Routes
// const {
//   verifyFacultyEmail,
//   registerFaculty,
//   loginFaculty,
// } = require("../controllers/facultyController");

// const { forgotPassword, verifyOtp, resetPassword } = require('../controllers/facultyAuthController');
// const generateCredentials = require('../Mail_manage/generateCredentials');

// // 📧 Step 1: Faculty Email Verification (Check in FacultyData.json + Send OTP)
// router.post("/verify-faculty/email", verifyFacultyEmail);

// // 🔐 Step 2: OTP Verification for Faculty Login or Forgot Password
// router.post("/verify-faculty/otp", verifyOtp); // Using verifyOtp directly from the controller

// // 📝 Step 3: Faculty Registration
// router.post("/faculty/register", registerFaculty);

// // 🔓 Step 4: Faculty Login
// router.post("/faculty/login", loginFaculty);

// // 🔑 Step 5: Faculty Generate Credentials
// router.post('/verify-faculty/generate-credentials', generateCredentials);

// // Forgot Password Route (Faculty Forgot Password)
// router.post('/faculty/forgot-password', forgotPassword);  // OTP sent to the email

// // Verify OTP Route (For resetting password after OTP verification)
// router.post('/faculty/verify-otp', verifyOtp);  // Verify OTP

// // Reset Password Route (After OTP verification, reset the password)
// router.post('/faculty/reset-password', resetPassword);  // Change the password

// console.log("\n✅ facultyRoutes.js is loaded");

// module.exports = router;
