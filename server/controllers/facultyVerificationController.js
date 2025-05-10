
// const fs = require("fs");
// const path = require("path");
// const Student = require("../models/Student");
// const Alumni = require("../models/Alumni");

// const sendOtpToEmail = require("../Mail_manage/sendOtp");
// const { verifyOtp } = require("../Mail_manage/otpStore");

// const verifyFacultyEmail = async (req, res) => {
//   console.log("\n📍 Controller => verifyFacultyEmail");

//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

    
// const filePath = path.join(__dirname, "../helpers/FacultyData.json");
// const rawData = fs.readFileSync(filePath, "utf-8");
// const facultyList = JSON.parse(rawData).map(faculty => ({
//   ...faculty,
//   Email: faculty.Email ? faculty.Email.trim() : ""
// }));

// const faculty = facultyList.find(
//   (e) => e.Email && e.Email.toLowerCase() === email.trim().toLowerCase()
// );

//   console.log("Requested Email is : ",email)
//     if (!faculty) {
//       console.log("❌ Faculty not found:", email);
//       return res.status(404).json({
//         success: false,
//         message: "You are not from this university 😕",
//       });
//     }
//     console.log("✅ Faculty verified from FacultyData.json:", faculty.Email);

//     // Step 2: Check if already registered in MongoDB
    
//       // Step 2: Check if already registered as Student
//       let existingUser = await Student.findOne({ Email: email });
//       if (existingUser) {
//         console.log("⚠️ Already registered as Student:", email);
//         return res.status(409).json({ // 409 Conflict
//           success: false,
//           message: "You are already registered as a Student, please login 👋",
//         });
//       }
  
//       // Check if already registered as Alumni
//       existingUser = await Alumni.findOne({ Email: email });
//       if (existingUser) {
//         console.log("⚠️ Already registered as Alumni:", email);
//         return res.status(409).json({ // 409 Conflict
//           success: false,
//           message: "You are already registered as an Alumni, please login 👋",
//         });
//       }
  
//       // If not registered in either collection
//       return res.status(200).json({
//         success: true,
//         message: "You can proceed with registration!",
//       });
//       console.error("❌ Error checking registration status:", error);
//       return res.status(500).json({ message: "Internal server error" });
   
//     }
//        }
//     // Step 3: Valid faculty + not registered → send OTP
//     const otp = await sendOtpToEmail(email); // Assume it returns the OTP string
//     console.log(`📧 OTP sent to ${email}: ${otp}`);

//     return res.status(200).json({
//       success: true,
//       message: "Email verified successfully ✅ | OTP sent 🔐",
//       email: faculty.Email,
//       name: faculty.Name,
//       department: faculty.Department,
//     });

//   } catch (error) {
//     console.error("❌ Error in verifyFacultyEmail:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error 🚨",
//     });
//   }
// };

// module.exports = { verifyFacultyEmail, verifyOtp };

const fs = require("fs");
const path = require("path");
// const Student = require("../models/Student");
// const Alumni = require("../models/Alumni");
const Faculty = require("../models/Faculty")

const sendOtpToEmail = require("../Mail_manage/sendOtp");
const { verifyOtp } = require("../Mail_manage/otpStore");

const verifyFacultyEmail = async (req, res) => {
  console.log("\n📍 Controller => verifyFacultyEmail");

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Load faculty data from JSON file
    const filePath = path.join(__dirname, "../helpers/FacultyData.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const facultyList = JSON.parse(rawData).map(faculty => ({
      ...faculty,
      Email: faculty.Email ? faculty.Email.trim() : ""
    }));

    // Check if the faculty exists
    const faculty = facultyList.find(
      (e) => e.Email && e.Email.toLowerCase() === email.trim().toLowerCase()
    );

    console.log("Requested Email is : ", email);
    if (!faculty) {
      console.log("❌ Faculty not found:", email);
      return res.status(404).json({
        success: false,
        message: "You are not from this university 😕",
      });
    }
    console.log("✅ Faculty verified from FacultyData.json:", faculty.Email);

    // Step 2: Check if already registered in MongoDB
    let existingUser = await Faculty.findOne({ Email: email });
    if (existingUser) {
      console.log("⚠️ Already registered as Student:", email);
      return res.status(409).json({ // 409 Conflict
        success: false,
        message: "You are already registered as a Student, please login 👋",
      });
    }

   

    // Step 3: Valid faculty + not registered → send OTP
    const otp = await sendOtpToEmail(email); // Assume it returns the OTP string
    console.log(`📧 OTP sent to ${email}: ${otp}`);

    // Send response with faculty details and OTP request
    return res.status(200).json({
      success: true,
      message: "Email verified successfully ✅ | OTP sent 🔐",
      email: faculty.Email,
      name: faculty.Name,
      department: faculty.Department,
    });

  } catch (error) {
    console.error("❌ Error in verifyFacultyEmail:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error 🚨",
    });
  }
};

module.exports = { verifyFacultyEmail, verifyOtp };
