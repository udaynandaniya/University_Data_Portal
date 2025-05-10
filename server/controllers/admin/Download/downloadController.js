const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Department = require('../../../models/Department'); // Assuming you have a Department model in models/Department.js

const departmentJsonPath = path.join(__dirname, '../../../helpers/departmentData.json');

// ===== Download Department Data from JSON File =====
exports.downloadDepartmentJSON = (req, res) => {
  try {
    const departmentData = fs.readFileSync(departmentJsonPath, 'utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=departmentData.json');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(departmentData);
  } catch (err) {
    console.error("Error downloading Department JSON:", err);
    res.status(500).json({ message: 'Error downloading Department data from JSON file', error: err.message });
  }
};

// ===== Download Department Data from MongoDB =====
exports.downloadDepartmentDB = async (req, res) => {
  try {
    const departments = await Department.find(); // Assuming your MongoDB collection is 'departments' in the 'educonnect' database
    res.setHeader('Content-Disposition', 'attachment; filename=departmentData.json');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(departments);
  } catch (err) {
    console.error("Error downloading Department data from MongoDB:", err);
    res.status(500).json({ message: 'Error downloading Department data from MongoDB', error: err.message });
  }
};


