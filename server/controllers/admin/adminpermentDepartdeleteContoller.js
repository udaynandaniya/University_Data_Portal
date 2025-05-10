const { deleteDepartment } = require('./admindepartController'); // Import the MongoDB deletion function
const { deleteDepartmentFromJson } = require('./admindepartjsonController'); // Import the JSON deletion function
const mongoose = require("mongoose");
const Department = require("../../models/Department"); // adjust the path if needed


exports.deletepermentDepartment = async (req, res) => {
  console.log("\n✅ Inside deletepermentDepartment");

  const department = req.body;  // full object
  const { _id, DepartmentId } = department;

  console.log("➡️ MongoDB _id:", _id);
  console.log("➡️ JSON DepartmentId:", DepartmentId);

  console.log("Step 1: Delete from MongoDB");
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid department ID format");
    }

    const deleted = await Department.findByIdAndDelete(_id);

    if (!deleted) {
      throw new Error("Department not found");
    }

    console.log("✅ Department deleted from MongoDB");
  } catch (error) {
    console.error("❌ Delete Error:", error);
    return res.status(500).json({ error: "Failed to delete from MongoDB" });
  }

  // Step 2: Delete from JSON
  try {
    await deleteDepartmentFromJson(DepartmentId);
    console.log("✅ Department deleted from JSON file");
    return res.status(200).json({
      success: true,
      message: "✅ Department deleted permanently from MongoDB and JSON file",
    });
  } catch (error) {
    console.error("❌ JSON Delete Error:", error);
    return res.status(500).json({ error: "Deleted from DB, but failed to delete from JSON" });
  }
};


