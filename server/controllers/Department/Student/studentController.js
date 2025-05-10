// const Student = require("../../../models/Student");

// console.log("\n 📘 Inside Student Controller");

// // ✅ Get all students
// // exports.getAllStudents = async (req, res) => {
// //   console.log("\n📄 Fetching all students...");
// //   try {
// //     const students = await Student.find();
// //     res.status(200).json(students);
// //   } catch (error) {
// //     console.error("❌ Error fetching students:", error);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };
// exports.getAllStudents = async (req, res) => {
//   console.log("\n📄 Fetching students based on department...");

//   try {
//     const { departmentName } = req.query; // 👈 Capture departmentName from query
//     console.log("📥 departmentName received from client:", departmentName);

//     if (!departmentName) {
//       return res.status(400).json({ message: "Department name is required" });
//     }

//     // Create regex to match "B.TECH-<Department>" even if (AIML) or anything extra exists
//     const programRegex = new RegExp(`^B\\.TECH-${departmentName}`, 'i'); // 👈 match starting with B.TECH-departmentName
//     console.log("🔎 Searching students where Program starts with:", programRegex);

//     // Find students matching Program regex
//     const students = await Student.find({ Program: { $regex: programRegex } });

//     console.log(`✅ Found ${students.length} students for department "${departmentName}".`);
//     res.status(200).json(students);

//   } catch (error) {
//     console.error("❌ Error fetching students:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ✅ Add new student
// exports.addStudent = async (req, res) => {
//   console.log("\n📄 Adding new student:", req.body);
//   try {
//     const newStudent = new Student(req.body);
//     await newStudent.save();
//     res.status(201).json({ message: "Student added successfully!" });
//   } catch (error) {
//     console.error("❌ Error adding student:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ✅ Update student
// exports.updateStudent = async (req, res) => {
//   const { id } = req.params;
//   console.log(`📄 Updating student ID: ${id}`, req.body);
//   try {
//     const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json({ message: "Student updated successfully!" });
//   } catch (error) {
//     console.error("❌ Error updating student:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ✅ Delete student
// exports.deleteStudent = async (req, res) => {
//   const { id } = req.params;
//   console.log(`📄 Deleting student ID: ${id}`);
//   try {
//     const deletedStudent = await Student.findByIdAndDelete(id);
//     if (!deletedStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json({ message: "Student deleted successfully!" });
//   } catch (error) {
//     console.error("❌ Error deleting student:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const mongoose = require("mongoose");
const Student = require("../../../models/Student"); // Changed from Alumni to Student


console.log("\n📍 Inside Department => StudentController.js");

exports.getAllStudents = async (req, res) => {
  console.log("\n📄 Fetching students based on department...");

  try {
    const { departmentName } = req.query; // 👈 Capture departmentName from query
    console.log("📥 departmentName received from client:", departmentName);

    if (!departmentName) {
      return res.status(400).json({ message: "Department name is required" });
    }

    // Create regex to match "B.TECH-<Department>" even if (AIML) or anything extra exists
    const programRegex = new RegExp(`^B\\.TECH-${departmentName}`, 'i'); // 👈 match starting with B.TECH-departmentName
    console.log("🔎 Searching students where Program starts with:", programRegex);

    // Find students matching Program regex
    const students = await Student.find({ Program: { $regex: programRegex } });

    console.log(`✅ Found ${students.length} students for department "${departmentName}".`);
    res.status(200).json(students);

  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateStudentInMongoDB = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log('\n📥 [MongoDB] Update Request Received');
  console.log('🔍 ID:', id);
  console.log('📦 Update Data:', updateData);

  if (!id) {
    console.error('❌ No ID provided');
    return res.status(400).json({ message: 'Missing student ID in request.' });
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStudent) {
      console.warn(`⚠️ No student found with ID: ${id}`);
      return res.status(404).json({ message: 'Student not found in MongoDB.' });
    }

    console.log('✅ MongoDB update successful');
    return res.status(200).json({ message: 'MongoDB student updated.', data: updatedStudent });
  } catch (error) {
    console.error('❌ MongoDB update failed:', error);
    return res.status(500).json({ message: 'MongoDB update error', error: error.message });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;

    console.log("\n🗑️ Deleting student inside deleteStudent function");
    console.log("\n🆔 ID:", id);
    console.log("\n🏢 Department:", departmentName);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(id);
    console.log("✅ Student deleted successfully from MongoDB");

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting student:", error);
    res.status(500).json({ message: "Server error" });
  }
};
