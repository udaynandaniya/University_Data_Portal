const mongoose = require("mongoose");
const Faculty = require("../../../models/Faculty");

console.log("\n📍 Inside Department => FacultyController.js");

// ✅ Get all faculties by department
exports.getAllFaculty = async (req, res) => {

  console.log("\n📄 Fetching faculties based on department...");

  try {
    const { departmentName } = req.query;
    console.log("📥 departmentName received from client:", departmentName);

    if (!departmentName) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const departmentRegex = new RegExp(departmentName, "i");
    console.log("🔎 Searching faculties where Department matches:", departmentRegex);

    const faculties = await Faculty.find({ Department: { $regex: departmentRegex } });

    console.log(`✅ Found ${faculties.length} faculties for department "${departmentName}".`);
    res.status(200).json(faculties);
  } catch (error) {
    console.error("❌ Error fetching faculties:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ Update faculty by ID
exports.updateFacultyInMongoDB = async (req, res) => {
  console.log("\n📍 Inside updateFaculty()");

  const { id } = req.params;
  const updateData = req.body;

  console.log("🔧 Updating faculty ID:", id);
  console.log("📦 Update data received:", updateData);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid faculty ID" });
  }

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedFaculty) {
      console.warn(`⚠️ No faculty found with ID: ${id}`);
      return res.status(404).json({ message: "Faculty not found" });
    }

    console.log("✅ Faculty updated successfully");
    res.status(200).json({ message: "Faculty updated successfully!", data: updatedFaculty });
  } catch (error) {
    console.error("❌ Error updating faculty:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Delete faculty by ID
exports.deleteFaculty = async (req, res) => {
  console.log("\n📍 Inside deleteFaculty()");

  const { id } = req.params;
  console.log("🗑️ Faculty ID to delete:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid faculty ID" });
  }

  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(id);

    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    console.log("✅ Faculty deleted successfully");
    res.status(200).json({ message: "Faculty deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting faculty:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
