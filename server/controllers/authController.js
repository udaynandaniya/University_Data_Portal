const userModel = require("../models/userModels");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { setOtp, verifyOtp } = require("../Mail_manage/otpStore");

const studentModel = require("../models/Student");
const alumniModel = require("../models/Alumni");
const getEnrollmentByEmail = require("../Mail_manage/getEnrollmentByEmail");



// Send OTP to email (based on email or enrollment)
const forgotPassword = async (req, res) => {
  const { email, enrollment } = req.body;
  console.log("👉 Forgot Password Request:", { email, enrollment });

  try {
    
    let user;

    // Checking if email or enrollment is provided and searching accordingly
    if (email) {
      console.log("\nhii you entered email : ")
      console.log(`Finding user by Email: ${email}`);
      user = await studentModel.findOne({ Email: email });

      if (!user) {
        console.log("Not found in Student, checking Alumni...");
        // 2. If not found in Student, try Alumni model
        user = await alumniModel.findOne({ Email: email });
      }

    } else if (enrollment) {
      console.log("\nhii you entered enrollment : ")

      console.log(`Finding user by Enrollment: ${enrollment}`);
    
      // 1. Try finding in Student model first
      user = await studentModel.findOne({ Enrollment: enrollment });
      
      if (!user) {
        console.log("Not found in Student, checking Alumni...");
        // 2. If not found in Student, try Alumni model
        user = await alumniModel.findOne({ Enrollment: enrollment });
      }
    } else {
      return res.status(400).json({ message: "Email or Enrollment required" });
    }
    
    // After both tries
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const userEmail = user.Email; // Final email to send OTP

    // Store OTP (or send OTP logic)
    setOtp(userEmail, otp);
    console.log("✅ OTP generated and stored:", otp);

    // Email setup (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Reset Password OTP",
      text: `Your OTP to reset password is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📨 OTP email sent to:", userEmail);
    res.status(200).json({ message: "OTP sent to email" });

  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP and Reset Password
// const resetPassword = async (req, res) => {
//   const { email, enrollment, otp, newPassword } = req.body;
//   console.log("🔐 Reset Password Request:", { email, enrollment });
//   console.log(req.body)

//   try {
//     let user;


//     if (email) {
//       console.log("\nhii you entered email : ")
//       console.log(`Finding user by Email: ${email}`);
//       user = await studentModel.findOne({ Email: email });

//       if (!user) {
//         console.log("Not found in Student, checking Alumni...");
//         // 2. If not found in Student, try Alumni model
//         user = await alumniModel.findOne({ Email: email });
//       }

//     } else if (enrollment) {
//       console.log("\nhii you entered enrollment : ")

//       console.log(`Finding user by Enrollment: ${enrollment}`);
    
//       // 1. Try finding in Student model first
//       user = await studentModel.findOne({ Enrollment: enrollment });
      
//       if (!user) {
//         console.log("Not found in Student, checking Alumni...");
//         // 2. If not found in Student, try Alumni model
//         user = await alumniModel.findOne({ Enrollment: enrollment });
//       }
//     } else {
//       return res.status(400).json({ message: "Email or Enrollment required" });
//     }
//     const userEmail = user.Email;

//     // Verifying OTP
//     if (!verifyOtp(userEmail, otp)) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // Hashing the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await userModel.findOneAndUpdate(
//       { Email: userEmail },
//       { password: hashedPassword }
//     );

//     console.log("✅ Password updated for:", userEmail);
//     res.status(200).json({ message: "Password reset successful" });

//   } catch (err) {
//     console.error("❌ Error resetting password:", err);
//     res.status(500).json({ message: "Failed to reset password" });
//   }
// };

const resetPassword = async (req, res) => {
  console.log("\n in authController.js");

  // Use `let` here to allow re-assignment of `enrollment`
  let { email, enrollment, otp, newPassword } = req.body;
  console.log("🔐 Reset Password Request:", { email, enrollment });
  console.log(req.body);

  if (!enrollment) {
    console.log("\nuser come with email");
    const findedenrollment = getEnrollmentByEmail(email);
    if (!findedenrollment) {
      return res.status(404).json({ message: "Enrollment not found for the provided email." });
    }
    console.log("📩 Enrollment retrieved from email:", findedenrollment);

    // Now we assign the value to `enrollment`
    enrollment = findedenrollment;
    console.log("📩 Converted Enrollment is:", enrollment);
  }

  try {
    console.log("\nFirst, find the user to determine the correct model");
    let user = await studentModel.findOne({ Enrollment: enrollment }) ||
               await alumniModel.findOne({ Enrollment: enrollment });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Now get the correct model
    let userModel;
    if (await studentModel.exists({ Enrollment: enrollment })) {
      userModel = studentModel;
    } else if (await alumniModel.exists({ Enrollment: enrollment })) {
      userModel = alumniModel;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await userModel.findOneAndUpdate(
      { Enrollment: enrollment },
      { Password: hashedPassword }
    );
 console.log("\n✅ Password reset successfully")
    return res.json({ message: "✅ Password reset successfully." });
  } catch (error) {
    console.error("❌ Error resetting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const changePassword = async (req, res) => {
  console.log("🔧 Change Password API hit");

  const { enrollment, currentPassword, newPassword } = req.body;
  console.log("📥 Received:", { enrollment });

  try {
    // 1. Find user by enrollment number
    const user = await UserModel.findOne({ Enrollment: enrollment });

    if (!user) {
      console.error("❌ User not found.");
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.Password);
    if (!isMatch) {
      console.warn("⚠️ Current password does not match.");
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Save new password
    user.Password = hashedPassword;
    await user.save();

    console.log("✅ Password updated for:", enrollment);
    return res.status(200).json({ message: "Password changed successfully" });

  } catch (err) {
    console.error("❌ Error in change password:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { forgotPassword, resetPassword, changePassword };
