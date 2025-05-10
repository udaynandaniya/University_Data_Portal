// const sendOtpToEmail = require('../Mail_manage/sendOtp');
// const { setOtp, verifyOtp } = require('../Mail_manage/otpStore');

// const Faculty = require('../models/Faculty');
// const bcrypt = require('bcrypt');

// // Step 1: Forgot Password
// exports.forgotPassword = async (req, res) => {
//   console.log("Request Body for Forgot Password:", req.body); // Log the incoming request body

//   const { email } = req.body;

//   try {
//     const faculty = await Faculty.findOne({ Email: email });

//     if (!faculty) {
//       return res.status(404).json({ message: "Faculty not found!" });
//     }

//     // Generate and send OTP to the provided email
//     const otp = await sendOtpToEmail(email);

//     // Store OTP temporarily in a session or cache (if necessary)
//     // You might use a cache like Redis to store the OTP for a short period
//  return  res.status(200).json({
//   success: true,
//   message: "OTP sent successfully to email...",
// });
//     // res.status(200).json({ message: "OTP sent successfully to email. from back" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error while sending OTP" });
//   }
// };


// // Step 3: Reset Password after OTP Verification
// exports.resetPassword = async (req, res) => {

//   const { email, otp, newPassword } = req.body;

//   console.log("\nRequest Body for Reset Password:", req.body); // Log the incoming request body

//   if (!email || !otp || !newPassword) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   try {
//     const isOtpValid = verifyOtp(email, otp); // Verify OTP before resetting password
//     if (!isOtpValid) {
//       return res.status(400).json({ message: "Invalid or expired OTP." });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the password in the database
//     const updatedFaculty = await Faculty.findOneAndUpdate(
//       { Email: email },
//       { Password: hashedPassword },
//       { new: true }
//     );

//     if (updatedFaculty) {
//       res.status(200).json({ message: "Password updated successfully." });
//     } else {
//       res.status(400).json({ message: "Failed to update password." });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error while resetting password" });
//   }
// };

const sendOtpToEmail = require('../Mail_manage/sendOtp');
const { setOtp, verifyOtp } = require('../Mail_manage/otpStore');

const Faculty = require('../models/Faculty');
const bcrypt = require('bcrypt');

// Step 1: Forgot Password
exports.forgotPassword = async (req, res) => {
  console.log("Request Body for Forgot Password:", req.body); // Log the incoming request body

  const { email } = req.body;

  try {
    const faculty = await Faculty.findOne({ Email: email });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found!",
      });
    }

    // Generate and send OTP to the provided email
    const otp = await sendOtpToEmail(email);

    // Store OTP temporarily in a session or cache (if necessary)
    // You might use a cache like Redis to store the OTP for a short period

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to email...",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error while sending OTP",
    });
  }
};

// Step 3: Reset Password after OTP Verification
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  console.log("\nRequest Body for Reset Password:", req.body); // Log the incoming request body

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
    });
  }

  try {
    const isOtpValid = verifyOtp(email, otp); // Verify OTP before resetting password
    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const updatedFaculty = await Faculty.findOneAndUpdate(
      { Email: email },
      { Password: hashedPassword },
      { new: true }
    );

    if (updatedFaculty) {
      return res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update password.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error while resetting password",
    });
  }
};
