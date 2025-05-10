
// const Student = require("../models/Student");
// const Alumni = require("../models/Alumni");
// // const UserModel = require('../models/userModels');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const fs = require("fs");
// const path = require("path");
// const sendMail = require('../Mail_manage/sendMails.js');
// const otpStore = require("../Mail_manage/otpStore.js");
// const nodemailer = require("nodemailer");
// const { log } = require("console");
// const { determineUserRole } = require("../helpers/roleUtils");



// const registerUser = async (req, res) => {
//   try {
//     const { name, email, userId, password, enrollment } = req.body;

//     const filePath = path.join(__dirname, "../helpers/enrollmentData.json");
//     const rawData = fs.readFileSync(filePath, "utf-8");
//     const usersList = JSON.parse(rawData);
//     const enrollmentInfo = usersList.find((e) => e.Email === email);
//     if (!enrollmentInfo) {
//       return res.status(404).json({ error: "Enrollment record not found." });
//     }

//     const role = determineUserRole(enrollmentInfo.AcademicYear);
//     const SelectedModel = role === "Student" ? Student : Alumni;

    

//     const existingCentral = await Student.findOne({ Email: email });
//     if (existingCentral && existingCentral.Password) {
//       return res.status(400).json({ error: "User already registered. Please login." });
//     }

//     const existingCentral = await Alumni.findOne({ Email: email });
//     if (existingCentral && existingCentral.Password) {
//       return res.status(400).json({ error: "User already registered. Please login." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await SelectedModel.findOneAndUpdate(
//       { Enrollment: enrollmentInfo.Enrollment },
//       {
//         Name: enrollmentInfo.Name || name,
//         Email: email,
//         userId,
//         Password: hashedPassword,
//         role,
//         Enrollment: enrollmentInfo.Enrollment,
//         Gender: enrollmentInfo.Gender,
//         Program: enrollmentInfo.Program,
//         UniversitySeatNumber: enrollmentInfo.UniversitySeatNumber,
//         Whatsapp: enrollmentInfo.Whatsapp,
//         AcademicYear: enrollmentInfo.AcademicYear,
//         Logged: true,
//       },
//       { upsert: true, new: true }
//     );

//     await UserModel.findOneAndUpdate(
//       { Email: email },
//       {
//         Name: enrollmentInfo.Name || name,
//         Email: email,
//         role,
//         LoggedIn: true,
//       },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     await sendMail(
//       email,
//       "Welcome to Edu-Connect 🎓",
//       `Hi ${enrollmentInfo.Name || name},\n\nYou have successfully registered as a ${role}.\nEnjoy connecting!\n\n— Edu-Connect Team`
//     );

//     const newUser = await UserModel.findOne({ Email: email });

//     const formattedUser = {
//       Name: newUser.Name,
//       Email: newUser.Email,
//       Role: newUser.role,
//       LoggedIn: newUser.LoggedIn,
//       createdAt: newUser.createdAt,
//       updatedAt: newUser.updatedAt,
//       _id: newUser._id,
//     };

//     return res.status(201).json({
//       message: "User registered successfully.",
//       user: formattedUser,
//     });

//   } catch (error) {
//     console.error("❌ Registration Error:", error);
//     return res.status(500).json({ error: "Server error during registration" });
//   }
// };




// const loginUser = async (req, res) => {
//   const { identifier, password } = req.body;

//   try {
//     let user = await Student.findOne({
//       $or: [{ Email: identifier }, { Enrollment: identifier }],
//     });

//     let role = "Student";

//     if (!user) {
//       user = await Alumni.findOne({
//         $or: [{ Email: identifier }, { Enrollment: identifier }],
//       });
//       role = "Alumni";
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!user.Password) {
//       return res.status(400).json({ message: "Registration incomplete. Please sign up." });
//     }

//     const isMatch = await bcrypt.compare(password, user.Password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     // ⏳ Check if student should now be alumni
//     if (role === "Student") {
//       const currentYear = new Date().getFullYear();
//       const academicYear = parseInt(user.AcademicYear);

//       if (currentYear - academicYear >= 4) {
//         const alreadyAlumni = await Alumni.findOne({ Enrollment: user.Enrollment });

//         if (!alreadyAlumni) {
//           await Alumni.create({ ...user.toObject(), transferredAt: new Date() });
//           await Student.deleteOne({ _id: user._id });
//           user = await Alumni.findOne({ Enrollment: user.Enrollment });
//           role = "Alumni";
//           console.log("🔁 Auto-transferred student to alumni during login.");
//         }
//       }
//     }

//     const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });

//     res.status(200).json({ message: "Login successful", token, user, role });

//   } catch (error) {
//     console.error("🔥 Server error during login:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// const resolveEnrollment = async (req, res) => {
//   try {
//     const { email } = req.body;
//     console.log("\n📥 Email received:", email);

//     // First try to find in Student model
//     let user = await Student.findOne({ Email: email });

//     if (user) {
//       console.log("✅ Found in Student model:", user.Enrollment);
//       return res.json({ enrollment: user.Enrollment });
//     }

//     // If not found in Student, check in Alumni
//     user = await Alumni.findOne({ Email: email });

//     if (user) {
//       console.log("✅ Found in Alumni model:", user.Enrollment);
//       return res.json({ enrollment: user.Enrollment });
//     }

//     // Not found in either
//     console.log("❌ No user found in Student or Alumni with that email");
//     return res.status(404).json({ message: "No user found with that email." });

//   } catch (err) {
//     console.error("❌ Resolve Enrollment Error:", err);
//     res.status(500).json({ message: "Server error." });
//   }
// };


// module.exports = { registerUser, loginUser,resolveEnrollment };

const Student = require("../models/Student");
const Alumni = require("../models/Alumni");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const sendMail = require('../Mail_manage/sendMails.js');
const { determineUserRole } = require("../helpers/roleUtils");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, userId, password, enrollment } = req.body;

    const filePath = path.join(__dirname, "../helpers/enrollmentData.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const usersList = JSON.parse(rawData);
    const enrollmentInfo = usersList.find((e) => e.Email === email);
    if (!enrollmentInfo) {
      return res.status(404).json({ error: "Enrollment record not found." });
    }

    // 1. Check if user already registered in Student
    const existingStudent = await Student.findOne({ Email: email });
    if (existingStudent && existingStudent.Password) {
      return res.status(400).json({ error: "User already registered. Please login." });
    }

    // 2. Check if user already registered in Alumni
    const existingAlumni = await Alumni.findOne({ Email: email });
    if (existingAlumni && existingAlumni.Password) {
      return res.status(400).json({ error: "User already registered. Please login." });
    }

    const role = determineUserRole(enrollmentInfo.AcademicYear);
    const SelectedModel = role === "Student" ? Student : Alumni;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await SelectedModel.findOneAndUpdate(
      { Enrollment: enrollmentInfo.Enrollment },
      {
        Name: enrollmentInfo.Name || name,
        Email: email,
        // userId,
        Password: hashedPassword,
        // role,
        Enrollment: enrollmentInfo.Enrollment,
        Gender: enrollmentInfo.Gender,
        Program: enrollmentInfo.Program,
        UniversitySeatNumber: enrollmentInfo.UniversitySeatNumber,
        Whatsapp: enrollmentInfo.Whatsapp,
        AcademicYear: enrollmentInfo.AcademicYear,
        Logged: true,
      },
      { upsert: true, new: true }
    );

    await sendMail(
      email,
      "Welcome to Edu-Connect 🎓",
      `Hi ${enrollmentInfo.Name || name},\n\nYou have successfully registered as a ${role}.\nEnjoy connecting!\n\n— Edu-Connect Team`
    );

    const formattedUser = {
      Name: newUser.Name,
      Email: newUser.Email,
      Role: newUser.role,
      LoggedIn: newUser.Logged || false,
      Enrollment: newUser.Enrollment,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      _id: newUser._id,
    };

    return res.status(201).json({
      message: "User registered successfully.",
      user: formattedUser,
    });

  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res.status(500).json({ error: "Server error during registration" });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    let user = await Student.findOne({
      $or: [{ Email: identifier }, { Enrollment: identifier }],
    });

    let role = "Student";

    // If not found in Student, check Alumni
    if (!user) {
      user = await Alumni.findOne({
        $or: [{ Email: identifier }, { Enrollment: identifier }],
      });
      role = "Alumni";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.Password) {
      return res.status(400).json({ message: "Registration incomplete. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 🔁 Auto-transfer Student to Alumni after 4 years
    if (role === "Student") {
      const currentYear = new Date().getFullYear();
      const academicYear = parseInt(user.AcademicYear);

      if (currentYear - academicYear >= 4) {
        const alreadyAlumni = await Alumni.findOne({ Enrollment: user.Enrollment });

        if (!alreadyAlumni) {
          await Alumni.create({ ...user.toObject(), transferredAt: new Date(), role: "Alumni" });
          await Student.deleteOne({ _id: user._id });
          user = await Alumni.findOne({ Enrollment: user.Enrollment });
          role = "Alumni";
          console.log("🔁 Auto-transferred student to alumni during login.");
        }
      }
    }

    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token, user, role });

  } catch (error) {
    console.error("🔥 Server error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// RESOLVE ENROLLMENT
const resolveEnrollment = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("\n📥 Email received:", email);

    let user = await Student.findOne({ Email: email });
    if (user) {
      console.log("✅ Found in Student model:", user.Enrollment);
      return res.json({ enrollment: user.Enrollment });
    }

    user = await Alumni.findOne({ Email: email });
    if (user) {
      console.log("✅ Found in Alumni model:", user.Enrollment);
      return res.json({ enrollment: user.Enrollment });
    }

    console.log("❌ No user found in Student or Alumni with that email");
    return res.status(404).json({ message: "No user found with that email." });

  } catch (err) {
    console.error("❌ Resolve Enrollment Error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { registerUser, loginUser, resolveEnrollment };
