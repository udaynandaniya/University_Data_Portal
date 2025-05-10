
// const User = require("../models/userModels.js");
// const Department = require("../models/Department");
// const fs = require("fs");
// const path = require("path");
// const xlsx = require("xlsx");


// // ✅ Admin Login
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//       console.log("✅ Admin logged in");
//       return res.status(200).json({ success: true, message: "Admin login successful" });
//     } else {
//       console.log("❌ Invalid Admin Credentials");
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("❌ Error in Admin Login", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ✅ Get All Users (Login Counts)
// const getAllUsers = async (req, res) => {
//   try {
//     console.log("📥 Fetching all users...");

//     const allUsers = await User.find({});
//     const students = allUsers.filter((u) => u.role === "student");
//     const alumni = allUsers.filter((u) => u.role === "alumni");
//     const faculty = allUsers.filter((u) => u.role === "faculty");
//     const department = allUsers.filter((u) => u.role === "department");

//     const loggedInStudents = students.filter((u) => u.LoggedIn).length;
//     const loggedInAlumni = alumni.filter((u) => u.LoggedIn).length;
//     const loggedInFaculty = faculty.filter((u) => u.LoggedIn).length;
//     const loggedInDepartment = department.filter((u) => u.LoggedIn).length;

//     res.status(200).json({
//       success: true,
//       stats: {
//         totalStudents: students.length,
//         totalAlumni: alumni.length,
//         totalFaculty: faculty.length,
//         totalDepartment: department.length,
//         totalUsers: allUsers.length,
//         loggedInStudents,
//         loggedInAlumni,
//         loggedInFaculty,
//         loggedInDepartment,
//         totalLoggedIn: loggedInStudents + loggedInAlumni + loggedInFaculty + loggedInDepartment,
//       },
//     });

//     console.log("✅ Fetched all user data successfully");
//   } catch (error) {
//     console.error("❌ Error fetching users", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ✅ Get All Departments
// const getAllDepartments = async (req, res) => {
//   try {
//     console.log("📄 Fetching all departments...");
//     const departments = await Department.find();
//     res.status(200).json({ success: true, departments });
//   } catch (error) {
//     console.error("❌ Error fetching departments", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ✅ Update Department
// const updateDepartment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`📄 Updating department ID: ${id}`);
//     const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedDepartment) {
//       return res.status(404).json({ message: "Department not found" });
//     }
//     res.status(200).json({ success: true, message: "Department updated successfully!" });
//   } catch (error) {
//     console.error("❌ Error updating department", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ✅ Delete Department
// const deleteDepartment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`🗑️ Deleting department ID: ${id}`);
//     const deletedDepartment = await Department.findByIdAndDelete(id);
//     if (!deletedDepartment) {
//       return res.status(404).json({ message: "Department not found" });
//     }
//     res.status(200).json({ success: true, message: "Department deleted successfully!" });
//   } catch (error) {
//     console.error("❌ Error deleting department", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ✅ Upload Department Data (Excel/PDF)
// const uploadDepartmentData = async (req, res) => {
//   try {
//     // Log the file information for debugging purposes
//     console.log("📥 File received:", req.file);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//     console.log("✅ Parsed Excel data:", data); // Log parsed data for debugging

//     // Insert the data into the Department model
//     await Department.insertMany(data);

//     res.status(201).json({ success: true, message: "Departments uploaded successfully" });
//   } catch (error) {
//     console.error("❌ Error uploading departments:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = {
//   adminLogin,
//   getAllUsers,
//   getAllDepartments,
//   updateDepartment,
//   deleteDepartment,
//   uploadDepartmentData,
// };

