const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Alumni = require("../models/Alumni");
const Faculty = require ("../models/Faculty")

// GET Profile
router.get("/student/:role/:enrollment", async (req, res) => {
  const { role, enrollment } = req.params;

  console.log(`\n📥i am in profileroutes.js [GET] /profile/${role}/${enrollment}`);

  try {
    let user;

    if (role.toLowerCase() === "student") {
      user = await Student.findOne({ Enrollment: enrollment });
    } else if (role.toLowerCase() === "alumni") {
      user = await Alumni.findOne({ Enrollment: enrollment });
    }
    else {
      return res.status(400).json({ message: "❌ Invalid role" });
    }

    if (!user) return res.status(404).json({ message: "⚠️ Profile not found" });

    const userObj = user.toObject();
    delete userObj.Password;

    console.log("✅ Profile fetched successfully");
    res.status(200).json(userObj);
  } catch (error) {
    console.error("🔥 Error in GET /profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// router.get("/faculty/:facultyId", async (req, res) => {
//   const { facultyId } = req.params;

//   console.log(`\n📥 [GET] /profile/faculty/${facultyId}`);

//   try {
//     if (role.toLowerCase() !== "faculty") {
//       return res.status(400).json({ message: "❌ Invalid role for this endpoint" });
//     }

//     const user = await Faculty.findOne({ FacultyID: facultyId });

//     if (!user) {
//       return res.status(404).json({ message: "⚠️ Faculty profile not found" });
//     }

//     const userObj = user.toObject();
//     delete userObj.Password;

//     console.log("✅ Faculty profile fetched successfully");
//     res.status(200).json(userObj);
//   } catch (error) {
//     console.error("🔥 Error in GET /profile/faculty:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// PUT Update Profile


router.get("/profile/faculty/:facultyId", async (req, res) => {
  try {
    const { facultyId } = req.params;  // Extract facultyId from the URL
    const role = req.query.role || req.headers['role'];  // Extract role from query or headers (adjust as needed)

    if (!role) {
      // If role is missing, send an error response
      return res.status(400).json({ message: "Role is required" });
    }

    console.log(`Fetching profile for Faculty ID: ${facultyId}, Role: ${role}`);

    // Fetch faculty profile from DB using facultyId (implement DB logic here)
    const facultyProfile = await getFacultyProfile(facultyId, role); // Assume this function exists

    if (!facultyProfile) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    return res.status(200).json(facultyProfile);  // Send the faculty profile as a response
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
});



router.put("/:role/:enrollment", async (req, res) => {
  const { role, enrollment } = req.params;
  const updatedData = req.body;

  console.log(`\n📝 [PUT] /profile/${role}/${enrollment}`);

  try {
    let user;

    if (role.toLowerCase() === "student") {
  console.log("\nStudent ");

      user = await Student.findOneAndUpdate({ Enrollment: enrollment }, updatedData, { new: true });
    } else if (role.toLowerCase() === "alumni") {
  console.log("\nAlumani ");


      user = await Alumni.findOneAndUpdate({ Enrollment: enrollment }, updatedData, { new: true });
    } else {
      return res.status(400).json({ message: "❌ Invalid role" });
    }

    if (!user) return res.status(404).json({ message: "⚠️ Profile not found" });

    console.log("✅ Profile updated successfully");
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("🔥 Error in PUT /profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
