const Faculty = require("../../../models/Faculty");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const facultyDataPath = path.join(__dirname, "../../../helpers/FacultyData.json");

exports.deletePermanentFaculty = async (req, res) => {
  const { id } = req.params;
  const { Email } = req.body;

  console.log("\n📍 Starting permanent delete for Faculty ID:", id, "Email:", Email);

  try {
    // Step 1: Delete from JSON
    const facultyData = JSON.parse(fs.readFileSync(facultyDataPath, "utf-8"));

    const updatedFacultyData = facultyData.filter(faculty => faculty.Email !== Email);

    if (updatedFacultyData.length === facultyData.length) {
      console.warn("⚠️ Email not found in JSON file");
      return res.status(404).json({ message: "Faculty not found in JSON file" });
    }

    fs.writeFileSync(facultyDataPath, JSON.stringify(updatedFacultyData, null, 2), "utf-8");
    console.log("✅ Deleted from JSON file");

    // Step 2: Delete from MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found in MongoDB" });
    }

    await Faculty.findByIdAndDelete(id);
    console.log("✅ Deleted from MongoDB");

    // Final success response
    res.status(200).json({
      success: true,
      message: "✅ Faculty permanently deleted from MongoDB and JSON file",
    });

  } catch (error) {
    console.error("❌ Error in permanent deletion:", error);
    res.status(500).json({ message: "Server error during deletion" });
  }
};
