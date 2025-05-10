// Example: routes/department.js or a similar router file

const Student = require("../../../models/Student");
const Alumni = require("../../../models/Alumni");
exports.StudentToAlumni = async (req, res) => {
    const { departmentName, academicYear } = req.body;

    console.log("\n I am at StudentToAlumni")
    
  
    try {
      const studentsToTransfer = await Student.find({
        AcademicYear: academicYear,
      });
  
      if (studentsToTransfer.length === 0) {
        return res.status(404).json({ message: 'No students found to transfer.' });
      }
  
      for (const student of studentsToTransfer) {
        const alreadyInAlumni = await Alumni.findOne({ Enrollment: student.Enrollment });
  
        if (!alreadyInAlumni) {
          await Alumni.create({ ...student.toObject(), transferredAt: new Date() });
          await Student.deleteOne({ _id: student._id });
          console.log(`✅ Transferred ${student.Enrollment} to Alumni`);
        } else {
          console.log(`⚠️ Already exists in Alumni: ${student.Enrollment}, skipping...`);
        }
      }
  
      res.status(200).json({ message: 'Transfer process completed.' });
  
    } catch (error) {
      console.error('❌ Transfer error:', error);
      res.status(500).json({ message: 'Server error while transferring students.' });
    }
  };
  