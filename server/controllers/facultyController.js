const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const Faculty = require("../models/Faculty");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const sendMail = require('../Mail_manage/sendMails.js');


const registerFaculty = async (req, res) => {
  console.log("\n📍 Controller => facultyController.js => registerFaculty");

  try {
    const { Name, Email, Password } = req.body;
    console.log("\n📥 Request body:", req.body);

    // Check if Email is provided
    if (!Email) {
      console.warn("⚠️ Email is missing in request body");
      return res.status(400).json({ error: "Email is required to register." });
    }

    // 1) Load FacultyData.json
    const filePath = path.join(__dirname, "../helpers/FacultyData.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const facultyList = JSON.parse(rawData);

    // 2) Find faculty info by email (case insensitive + trimmed)
    const facultyInfo = facultyList.find((e) => 
      e.Email?.trim().toLowerCase() === Email.trim().toLowerCase()
    );
    if (!facultyInfo) {
      console.warn("⚠️ Faculty Email not found in FacultyData.json:", Email);
      return res.status(404).json({ error: "Faculty record not found." });
    }

    // 3) Check if already registered
    const existingFaculty = await Faculty.findOne({ Email: Email.trim().toLowerCase() });
    if (existingFaculty && existingFaculty.Password) {
      console.warn("⚠️ Faculty already registered:", Email);
      return res.status(400).json({ error: "Faculty already registered. Please login." });
    }

    // 4) Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // 5) Save or update Faculty
    await Faculty.findOneAndUpdate(
      { Email: Email.trim().toLowerCase() },
      {
        FacultyID: facultyInfo.FacultyID,
        Name: facultyInfo.Name || Name,
        Email: Email.trim().toLowerCase(),
        Department: facultyInfo.Department,
        Phone: facultyInfo.Phone,
        Designation: facultyInfo.Designation,
        Password: hashedPassword

      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const facultyID = facultyInfo.FacultyID;
    console.log("✅ Faculty saved to Faculty Collection");
    console.log("\n✅ Faculty saved as facultyID is ",facultyID);


    

    // 7) Send Welcome Email
    await sendMail(
      Email.trim().toLowerCase(),
      "Welcome to Edu-Connect 🎓 (Faculty)",
      `Hi ${facultyInfo.Name || Name},\n\nYou have successfully registered as a Faculty Member.\nWelcome to Edu-Connect!\n\n— Edu-Connect Team`
    );
    console.log("📨 Welcome mail sent.");

   

    return res.status(201).json({
      message: "Faculty registered successfully.",
      facultyID,
    });

  } catch (error) {
    console.error("❌ Error in registerFaculty:", error);

    if (error.code === 11000) {
      return res.status(409).json({ error: "Faculty with this email already exists." });
    }

    res.status(500).json({ error: "Server error during faculty registration" });
  }
};





const loginFaculty = async (req, res) => {
  console.log("\n📍 Controller => facultyController.js => loginFaculty");

  const { identifier: email, password } = req.body;

  console.log("\n Requested data Email is :", email);
  console.log("req.body =>", req.body);




  try {
    const faculty = await Faculty.findOne({ Email : email });

    if (!faculty) {
      console.log("❌ Faculty not found:", email);
      return res.status(404).json({ message: "Faculty not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, faculty.Password);
    if (!isMatch) {
      console.log("❌ Invalid credentials for:", email);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: faculty._id, email: faculty.Email },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "7d" }
    );

    console.log("✅ Faculty login successful:", email);

    res.status(200).json({
      message: "Login successful.",
      token,
      faculty: {
        id: faculty._id,
        name: faculty.Name,
        email: faculty.Email,
      },
    });
  } catch (err) {
    console.error("❌ Error in loginFaculty:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerFaculty,
  loginFaculty,
};
