const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // You missed importing bcrypt

console.log("\nmodels => Department.js");

const departmentSchema = new mongoose.Schema({
  DepartmentId: { type: String, required: true }, 
  Name: { type: String, required: true }, 
  Department_head: { type: String },
  Email: { type: String, required: true, unique: true }, // Ensure unique email
  Password: { type: String, required: true }, 
  lastLoggedIn: { type: Date }, // New field to store last login time
});

// Middleware to hash password before saving it
departmentSchema.pre('save', async function(next) {
  if (this.isModified('Password')) { // Changed 'password' to 'Password' to match the field name
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
  }
  next();
});

// Method to compare password (for login or validation purposes)
departmentSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

module.exports = mongoose.model('Department', departmentSchema);
