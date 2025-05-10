// // verifyDeletionOtp.js
// const otpStore = require("../Mail_manage/otpStore");
// const User = require('../models/userModels');
// const sendOtpToEmail = require("../Mail_manage/sendOtp");

// const verifyDeletionOtp = async (req, res) => {
//   const { otp, enrollment, role } = req.body;

//   try {
//     // Validate the OTP for the given email
//     if (otpStore[enrollment]) {
//       if (otp === otpStore[enrollment]) {
//         // If OTP is valid, proceed to delete the account
//         const user = await User.findOneAndDelete({ enrollment, role });
//         if (user) {
//           return res.status(200).json({ success: true, message: "Account deleted successfully." });
//         }
//         return res.status(404).json({ success: false, message: "User not found" });
//       } else {
//         return res.status(400).json({ success: false, message: "Invalid OTP" });
//       }
//     } else {
//       return res.status(400).json({ success: false, message: "OTP expired or not found" });
//     }
//   } catch (error) {
//     console.error("❌ Error in verifyDeletionOtp:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// module.exports = verifyDeletionOtp;
