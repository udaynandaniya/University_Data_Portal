
const Alumni = require("../../../models/Alumni");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const alumniDataPath = path.join(__dirname, '../../../helpers/enrollmentData.json');



exports.deletePermanentAlumni = async (req, res) => {
  const { id } = req.params;
  const { Enrollment } = req.body;

  console.log("\n📍 Starting permanent delete for ID:", id, "Enrollment:", Enrollment);

  try {
    
    // Step 1: Delete from JSON
    const alumniData = JSON.parse(fs.readFileSync(alumniDataPath, 'utf-8'));

    const updatedAlumniData = alumniData.filter(alum => alum.Enrollment !== Enrollment);

    if (updatedAlumniData.length === alumniData.length) {
      console.warn("⚠️ Enrollment not found in JSON file");
      return res.status(404).json({ message: "Alumni not found in JSON file" });
    }

    fs.writeFileSync(alumniDataPath, JSON.stringify(updatedAlumniData, null, 2), 'utf-8');
    console.log("✅ Deleted from JSON file");


    // Step 2: Delete from MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const alumni = await Alumni.findById(id);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found in MongoDB" });
    }

    await Alumni.findByIdAndDelete(id);
    console.log("✅ Deleted from MongoDB");

    // Final success response
    res.status(200).json({
      success: true,
      message: "✅ Alumni permanently deleted from MongoDB and JSON file",
    });

  } catch (error) {
    console.error("❌ Error in permanent deletion:", error);
    res.status(500).json({ message: "Server error during deletion" });
  }
};

