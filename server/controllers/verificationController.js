// const fs = require("fs");
// const path = require("path");
// const nodemailer = require("nodemailer");
// const otpStore = require("../Mail_manage/otpStore");
// const User = require('../models/userModels');
// const sendOtpToEmail = require("../Mail_manage/sendOtp");
// const { verifyOtp } = require("../Mail_manage/otpStore");


// const verifyEnrollment = async (req, res) => {
//   const { enrollment } = req.body;
//   const filePath = path.join(__dirname, "../helpers/enrollmentData.json");

//   console.log("\n🎯 controller => verificationController.js : verifyEnrollment function");

//   try {
//     console.log("📂 Reading enrollmentData.json...");

//     // Read and parse the enrollment JSON data safely
//     const rawData = fs.readFileSync(filePath, "utf-8");

//     let students;
//     try {
//       students = JSON.parse(rawData);
//     } catch (jsonError) {
//       console.error("❌ JSON Parsing Error:", jsonError.message);
//       return res.status(500).json({
//         success: false,
//         message: "Invalid JSON format in enrollmentData.json",
//       });
//     }

//     console.log("✅ enrollmentData.json parsed successfully.");

//     const student = students.find((s) => s.Enrollment === enrollment);

//     if (!student) {
//       console.warn(`⚠️ Enrollment ${enrollment} not found.`);
//       return res.status(404).json({ 
//         success: false, 
//         message: "Enrollment not found" 
//       });
//     }

//     console.log("🔍 Enrollment matched:", student.Enrollment, "| Email:", student.Email);

//     // Check if a user already exists in MongoDB
//     const existingUser = await User.findOne({ Email: student.Email });
//     if (existingUser) {
//       console.log("👤 User already registered in MongoDB:", student.Email);
//       return res.status(200).json({
//         success: false,
//         message: "User already registered. Please login instead.",
//       });
//     }

//     console.log("🔎 Determining user type (Student or Alumni)...");

//     const [startYearStr] = student.AcademicYear.split("-"); // e.g., "2022-23" -> "2022"
//     const startYear = parseInt(startYearStr);
//     const courseEndDate = new Date(`${startYear + 4}-06-30`);
//     const now = new Date();
//     const userType = now <= courseEndDate ? "Student" : "Alumni";

//     console.log("🎓 User is classified as:", userType);

//     // Send OTP to email
//     console.log("✉️ Sending OTP to:", student.Email);
//     const otp = await sendOtpToEmail(student.Email);
//     console.log(`✅ OTP sent to ${student.Email}: ${otp}`);

//     // Respond
//     res.status(200).json({
//       success: true,
//       message: `${userType} verified and OTP sent to email`,
//       email: student.Email,
//       name: student.Name,
//       type: userType, // 'Student' or 'Alumni'
//     });

//   } catch (error) {
//     console.error("❌ Error in verifyEnrollment:", error.message);
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal Server Error" 
//     });
//   }
// };



// module.exports = { verifyEnrollment, verifyOtp };
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const otpStore = require("../Mail_manage/otpStore");
const sendOtpToEmail = require("../Mail_manage/sendOtp");
const { verifyOtp } = require("../Mail_manage/otpStore");

const Student = require("../models/Student");
const Alumni = require("../models/Alumni");

const verifyEnrollment = async (req, res) => {
  const { enrollment } = req.body;
  const filePath = path.join(__dirname, "../helpers/enrollmentData.json");

  console.log("\n🎯 controller => verificationController.js : verifyEnrollment function");

  try {
    console.log("📂 Reading enrollmentData.json...");
    const rawData = fs.readFileSync(filePath, "utf-8");

    let students;
    try {
      students = JSON.parse(rawData);
    } catch (jsonError) {
      console.error("❌ JSON Parsing Error:", jsonError.message);
      return res.status(500).json({
        success: false,
        message: "Invalid JSON format in enrollmentData.json",
      });
    }

    console.log("✅ enrollmentData.json parsed successfully.");

    const student = students.find((s) => s.Enrollment === enrollment);

    if (!student) {
      console.warn(`⚠️ Enrollment ${enrollment} not found.`);
      return res.status(404).json({ 
        success: false, 
        message: "Enrollment not found" 
      });
    }

    console.log("🔍 Enrollment matched:", student.Enrollment, "| Email:", student.Email);

    // Check if already registered in Student model
    const existingStudent = await Student.findOne({ Email: student.Email });
    if (existingStudent && existingStudent.Password) {
      console.log("👤 User already registered in Student DB:", student.Email);
      return res.status(200).json({
        success: false,
        message: "User already registered. Please login instead.",
      });
    }

    // If not in Student, check in Alumni
    const existingAlumni = await Alumni.findOne({ Email: student.Email });
    if (existingAlumni && existingAlumni.Password) {
      console.log("👤 User already registered in Alumni DB:", student.Email);
      return res.status(200).json({
        success: false,
        message: "User already registered. Please login instead.",
      });
    }

    console.log("🔎 Determining user type (Student or Alumni)...");

    const [startYearStr] = student.AcademicYear.split("-");
    const startYear = parseInt(startYearStr);
    const courseEndDate = new Date(`${startYear + 4}-06-30`);
    const now = new Date();
    const userType = now <= courseEndDate ? "Student" : "Alumni";

    console.log("🎓 User is classified as:", userType);

    // Send OTP to email
    console.log("✉️ Sending OTP to:", student.Email);
    const otp = await sendOtpToEmail(student.Email);
    console.log(`✅ OTP sent to ${student.Email}: ${otp}`);

    res.status(200).json({
      success: true,
      message: `${userType} verified and OTP sent to email`,
      email: student.Email,
      name: student.Name,
      type: userType,
    });

  } catch (error) {
    console.error("❌ Error in verifyEnrollment:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

module.exports = { verifyEnrollment, verifyOtp };
