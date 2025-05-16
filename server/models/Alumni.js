// models=>Alumni.js


const mongoose = require("mongoose");

console.log("\n📦 models => Alumni.js");

const alumniSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  role: { type: String, default: "Alumni" },

  Enrollment: { type: String, unique: true },
  Gender: { type: String },
  Program: { type: String },
  UniversitySeatNumber: { type: String, unique: true },
  Whatsapp: { type: String },
  AcademicYear: { type: String },

  LoggedIn: { type: Boolean, default: false }, 
});
console.log("✅ Loaded Alumni model");

module.exports = mongoose.model("Alumni", alumniSchema);
