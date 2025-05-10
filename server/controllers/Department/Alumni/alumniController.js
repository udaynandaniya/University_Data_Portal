const mongoose = require("mongoose");
const Alumni = require("../../../models/Alumni");


console.log("\n📍 Inside Department => AlumniController.js");

exports.getAllAlumni = async (req, res) => {
  console.log("\n📄 Fetching alumni based on department...");

  try {
    const { departmentName } = req.query; // 👈 Capture departmentName from query
    console.log("📥 departmentName received from client:", departmentName);

    if (!departmentName) {
      return res.status(400).json({ message: "Department name is required" });
    }

    // Create regex to match "B.TECH-<Department>" even if (AIML) or anything extra exists
    const programRegex = new RegExp(`^B\\.TECH-${departmentName}`, 'i'); // 👈 match starting with B.TECH-departmentName
    console.log("🔎 Searching alumni where Program starts with:", programRegex);

    // Find alumni matching Program regex
    const alumni = await Alumni.find({ Program: { $regex: programRegex } });

    console.log(`✅ Found ${alumni.length} alumni for department "${departmentName}".`);
    res.status(200).json(alumni);

  } catch (error) {
    console.error("❌ Error fetching alumni:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.updateAlumniInMongoDB = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log('\n📥 [MongoDB] Update Request Received');
  console.log('🔍 ID:', id);
  console.log('📦 Update Data:', updateData);

  if (!id) {
    console.error('❌ No ID provided');
    return res.status(400).json({ message: 'Missing alumni ID in request.' });
  }

  try {
    const updatedAlumni = await Alumni.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedAlumni) {
      console.warn(`⚠️ No alumni found with ID: ${id}`);
      return res.status(404).json({ message: 'Alumni not found in MongoDB.' });
    }

    console.log('✅ MongoDB update successful');
    return res.status(200).json({ message: 'MongoDB alumni updated.', data: updatedAlumni });
  } catch (error) {
    console.error('❌ MongoDB update failed:', error);
    return res.status(500).json({ message: 'MongoDB update error', error: error.message });
  }
};



exports.deleteAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;

    console.log("\n🗑️ Deleting alumni inside deleteAlumni function");
    console.log("\n🆔 ID:", id);
    console.log("\n🏢 Department:", departmentName);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const alumni = await Alumni.findById(id);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    await Alumni.findByIdAndDelete(id);
    console.log("✅ Alumni deleted successfully from MongoDB");

    res.status(200).json({ message: "Alumni deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting alumni:", error);
    res.status(500).json({ message: "Server error" });
  }
};
