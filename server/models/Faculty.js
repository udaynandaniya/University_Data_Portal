
const mongoose = require("mongoose");
console.log("\n📦 models => Faculty.js");

const facultySchema = new mongoose.Schema(

  
  {
    FacultyID: { type: String, default: "" },

    Name: { type: String, required: true },

    Email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true,
      lowercase: true, 
      trim: true
    },

    Password: { type: String, required: true },

    Department: { type: String },

    Phone: { type: String, default: "" },

    Designation: { type: String, default: "" }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
