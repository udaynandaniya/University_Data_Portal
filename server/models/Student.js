
const mongoose = require("mongoose");
console.log("\n📦 models => Student.js");

const studentSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  role: { type: String, default: "Student" },

  Enrollment: { type: String, unique: true },
  Gender: { type: String },
  Program: { type: String },
  UniversitySeatNumber: { type: String, unique: true },
  Whatsapp: { type: String },
  AcademicYear: { type: String },

  LoggedIn: { type: Boolean, default: false },
});

console.log("✅ Loaded Student model");


module.exports = mongoose.model("Student", studentSchema);
