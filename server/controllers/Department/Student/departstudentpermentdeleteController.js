const Student = require("../../../models/Student");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const studentDataPath = path.join(__dirname, '../../../helpers/enrollmentData.json'); // Updated path to student data

exports.deletePermanentStudent = async (req, res) => {
  const { id } = req.params;
  const { Enrollment } = req.body;

  console.log("\n📍 Starting permanent delete for ID:", id, "Enrollment:", Enrollment);

  try {
    
    // Step 1: Delete from JSON
    const studentData = JSON.parse(fs.readFileSync(studentDataPath, 'utf-8'));

    const updatedStudentData = studentData.filter(student => student.Enrollment !== Enrollment);

    if (updatedStudentData.length === studentData.length) {
      console.warn("⚠️ Enrollment not found in JSON file");
      return res.status(404).json({ message: "Student not found in JSON file" });
    }

    fs.writeFileSync(studentDataPath, JSON.stringify(updatedStudentData, null, 2), 'utf-8');
    console.log("✅ Deleted from JSON file");

    // Step 2: Delete from MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found in MongoDB" });
    }

    await Student.findByIdAndDelete(id);
    console.log("✅ Deleted from MongoDB");

    // Final success response
    res.status(200).json({
      success: true,
      message: "✅ Student permanently deleted from MongoDB and JSON file",
    });

  } catch (error) {
    console.error("❌ Error in permanent deletion:", error);
    res.status(500).json({ message: "Server error during deletion" });
  }
};
