const fs = require("fs");
const path = require("path");
const Student = require("../../../models/Student");
const Faculty = require("../../../models/Faculty");
const Alumni = require("../../../models/Alumni");

// ===== JSON FILE DOWNLOADS =====
exports.downloadStudentJSON = (req, res) => {
  const filePath = path.join(__dirname, "../../../helpers/enrollmentData.json");
  res.download(filePath, "student-data.json");
};

exports.downloadFacultyJSON = (req, res) => {
  const filePath = path.join(__dirname, "../../../helpers/facultyData.json");
  res.download(filePath, "faculty-data.json");
};

// ===== DATABASE DOWNLOADS =====
exports.downloadStudentDB = async (req, res) => {
  try {
    const students = await Student.find();
    res.setHeader("Content-Disposition", "attachment; filename=students-db.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(students, null, 2)); // ✅ Pretty print
    
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch student data" });
  }
};

exports.downloadAlumniDB = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.setHeader("Content-Disposition", "attachment; filename=alumni-db.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(alumni, null, 2));
  } catch (err) {
    console.error("Error fetching alumni:", err);
    res.status(500).json({ error: "Failed to fetch alumni data" });
  }
};

exports.downloadFacultyDB = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.setHeader("Content-Disposition", "attachment; filename=faculty-db.json");
    res.json(faculty);
  } catch (err) {
    console.error("Error fetching faculty:", err);
    res.status(500).json({ error: "Failed to fetch faculty data" });
  }
};
