
const Department = require("../../models/Department"); // adjust the path if needed
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');


// GET all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ departments });
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};


exports.updateDepartment = async (req, res) => {
  const { id } = req.params;  // Extracting department ID from the request URL
  const { DepartmentId, Department_head, Name, Email } = req.body;  // Extracting data from the request body

  // Log the incoming data

  console.log('Request body:', req.body);
  console.log('Department ID from URL:', id);

  try {
    // Step 1: Check if the department ID is valid (MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid department ID:', id);
      return res.status(400).json({ message: "Invalid department ID" });
    }

    // Step 2: Log what we're about to do with the data
    console.log('Updating department with the following data:', {
      DepartmentId,
      Department_head,
      Name,
      Email
    });

    // Step 3: Find the department and update it
    const updatedDepartment = await Department.findByIdAndUpdate(
      id, 
      { DepartmentId,Department_head, Name, Email }, 
      { new: true } // Return the updated document
    );

    // Step 4: If the department doesn't exist
    if (!updatedDepartment) {
      console.log('Department not found with ID:', id);
      return res.status(404).json({ message: "Department not found" });
    }

    // Step 5: Log the successful update
    console.log('Department updated successfully:', updatedDepartment);

    // Return the updated department as the response
    res.status(200).json(updatedDepartment);
  } catch (error) {
    // Step 6: Handle any other errors during the update process
    console.error("Error during update:", error);
    res.status(500).json({ message: "Error updating department", error: error.message });
  }
};


exports.deleteDepartment = async (req,res) => {
  try {
    const { id } = req.params; 
    console.log("\nInside Delete the department from MongoDB");
    console.log("Incoming ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid department ID format");
    }

    const deleted = await Department.findByIdAndDelete(id);

    if (!deleted) {
      throw new Error("Department not found");
    }

    console.log("✅ Department deleted from MongoDB");
  } catch (error) {
    console.error("❌ Delete Error:", error);
    throw error;
  }
};

