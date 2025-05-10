// server/controllers/Student/StudentNavbar/passwordController.js

const bcrypt = require('bcryptjs');
const fs = require("fs");
const path = require("path");

// const verifyOtp = require('../../Mail_manage/verifyOtp'); // Import OTP verification function
const Student = require('../../models/Student'); // Import Student model
const Alumni = require('../../models/Alumni'); // Import Alumni model
const sendOtpToEmail = require('../../Mail_manage/sendOtp');
const { otpStore } = require("../../Mail_manage/otpStore");
const getEmailByEnrollment = require("../../Mail_manage/getEmailByEnrollment");

// Step 1: Generate OTP and send it to the user
exports.generateOtpAndSend = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate and send OTP
    const otp = await sendOtpToEmail(email); // OTP is automatically saved by sendOtpToEmail

    return res.status(200).json({ success: true, message: "OTP sent to your email." });
  } catch (err) {
    console.error('Error generating and sending OTP:', err);
    return res.status(500).json({ success: false, message: "Error sending OTP." });
  }
};

// Step 2: Verify OTP entered by the user
exports.verifyOtp = async (req, res) => {
  const { enrollment, otp } = req.body;
  
  console.log("\ncontroller => verifyOtp.js : verifyOtp function");
  const email = getEmailByEnrollment(enrollment);
  if (!email) {
    return res.status(404).json({ success: false, message: "Enrollment not found" });
  }


  const record = otpStore[email];

  console.log("Stored OTP record:", record);

  if (!record) {
    console.log("\n !record")

    return res.status(400).json({ success: false, message: "No OTP found for this email" });
  }

  if (record.otp === otp && Date.now() < record.expires) {
    console.log("\n record.otp === otp")

    delete otpStore[email]; // ✅ One-time use
    return res.json({ success: true, message: "OTP verified successfully" });
  } else {
    console.log("\n else part of record.otp === otp")

    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
};


// Step 3: Verify old password (for password change via old password)
exports.verifyOldPassword = async (req, res) => {
  const { enrollment, currentPassword, newPassword ,role } = req.body;

  try {
    console.log("\nverifyOldPassword")
    console.log(req.body)

    // Choose the correct model based on the role
     // Choose the correct model based on the role
     let user;

     // First, try finding in Student model
     user = await Student.findOne({ Enrollment: enrollment });
     
     if (!user) {
       // If not found, try Alumni model
       user = await Alumni.findOne({ Enrollment: enrollment });
     }
     
     if (!user) {
       return res.status(404).json({ message: "User not found." });
     }
     
    // Compare the current password with the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password." });
    }

    return res.status(200).json({ message: "Old password verified successfully." });
  } catch (err) {
    console.error('Error verifying old password:', err);
    return res.status(500).json({ message: "Something went wrong while verifying old password." });
  }
};

// Step 4: Change the password after successful OTP or old password verification
exports.changePassword = async (req, res) => {
  const { email, enrollment, newPassword, role } = req.body;
  console.log("\nchangePassword")
 
  console.log(req.body)


  try {
    // Choose the correct model based on the role
    let user;

// First, try finding in Student model
user = await Student.findOne({ Enrollment: enrollment });

if (!user) {
  // If not found, try Alumni model
  user = await Alumni.findOne({ Enrollment: enrollment });
}

if (!user) {
  return res.status(404).json({ message: "User not found." });
}

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.Password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error('Error updating password:', err);
    return res.status(500).json({ message: "Something went wrong while updating password." });
  }
};
