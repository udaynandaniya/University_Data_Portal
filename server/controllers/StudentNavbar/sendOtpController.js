const fs = require("fs");
const path = require("path");
const sendOtpToEmail = require("../../Mail_manage/sendOtp");
const Student = require("../../models/Student");
const Alumni = require("../../models/Alumni");

const sendOtpToStudent = async (req, res) => {
    console.log("\nsendOtptoStudent")
  const { enrollment } = req.body;
  const filePath = path.join(__dirname, "../../helpers/enrollmentData.json");

  console.log("\n🎯 controller => sendOtpController.js : sendOtpToStudent function");

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

    const email = student.Email;

    console.log("🔍 Matched enrollment:", enrollment, "| Email:", email);

    

    // ✅ Send OTP
    const otp = await sendOtpToEmail(email);
    console.log(`✅ OTP sent to ${email}: ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP sent to email successfully",
      email: email,
    });

  } catch (error) {
    console.error("❌ Error in sendOtpToStudent:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = sendOtpToStudent;
