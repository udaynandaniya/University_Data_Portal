const fs = require('fs');
const path = require('path');
const studentDataPath = path.join(__dirname, '../../../helpers/enrollmentData.json'); // Changed from alumniDataPath to studentDataPath
const sendMail = require("../../../Mail_manage/sendMails"); // Adjust this path as needed


// Function to add student data to the JSON file

exports.addStudentInJson = async (req, res) => {
  console.log("\n➕ Adding new student (JSON only):", req.body);

  try {
    // Step 1: Load existing data
    console.log("📁 Checking if JSON file exists at:", studentDataPath);
    let studentList = [];
    if (fs.existsSync(studentDataPath)) {
      const data = fs.readFileSync(studentDataPath, "utf8");
      studentList = JSON.parse(data);
      console.log(`📄 Loaded ${studentList.length} existing students`);
    } else {
      console.warn("⚠️ File does not exist, will create new");
    }

    // Step 2: Prepare new student object
    const newStudent = {
      SR: req.body.SR?.trim(),
      Enrollment: req.body.Enrollment?.trim(),
      Name: req.body.Name?.trim(),
      Gender: req.body.Gender,
      Program: req.body.Program,
      UniversitySeatNumber: req.body.UniversitySeatNumber?.trim(),
      Whatsapp: req.body.Whatsapp?.trim(),
      AcademicYear: req.body.AcademicYear,
      Email: req.body.Email?.trim().toLowerCase(),
    };

    console.log("📦 New student object:", newStudent);

    // Step 3: Check for duplicates
    const alreadyExists = studentList.some(
      (student) =>
        student.Enrollment?.trim() === newStudent.Enrollment ||
        student.Email?.toLowerCase().trim() === newStudent.Email
    );

    if (alreadyExists) {
      console.warn("❗ Duplicate student found, skipping addition.");
      return res.status(409).json({ message: "Student with this Enrollment or Email already exists." });
    }

    // Step 4: Save to JSON file
    studentList.push(newStudent);
    console.log("💾 Writing updated student list to file...");
    fs.writeFileSync(studentDataPath, JSON.stringify(studentList, null, 2));
    console.log("✅ Successfully written to JSON file");

    // Step 5: Send welcome email
    try {
      console.log("📧 Sending welcome email to:", newStudent.Email);
      const subject = "Welcome to Adani University Portal";
      const text = `Dear ${newStudent.Name},\n\nWelcome! You can now access the Adani University portal.\n\nRegards,\nAdani University`;
      const html = `<p>Dear <strong>${newStudent.Name}</strong>,</p><p>Welcome! You can now access the <strong>Adani University portal</strong>.</p><p>Regards,<br/>Adani University</p>`;

      await sendMail(newStudent.Email, subject, text, html);
      console.log("✅ Email sent successfully");
    } catch (emailErr) {
      console.error("❌ Email failed to send:", emailErr.message);
      // Optional: Still return success, or warn frontend
    }

    // Done
    return res.status(201).json({ message: "✅ Student added & welcome email sent!" });

  } catch (error) {
    console.error("❌ Error adding student or sending email:");
    console.error("📛 Error message:", error.message);
    console.error("📛 Stack trace:", error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateStudentInJson = async (req, res) => {
  const { rollNo } = req.params;
  const updateData = req.body;

  console.log('\n📥 [JSON] Update Request Received');
  console.log('🔍 Roll No:', rollNo);
  console.log('📦 Update Data:', updateData);

  if (!rollNo) {
    return res.status(400).json({ message: 'Missing roll number in request.' });
  }

  try {
    const students = JSON.parse(fs.readFileSync(studentDataPath, 'utf-8'));
    const index = students.findIndex(student => student.Enrollment === rollNo);

    if (index === -1) {
      console.warn(`⚠️ Student not found in JSON for Enrollment: ${rollNo}`);
      return res.status(404).json({ message: 'Student not found in JSON.' });
    }

    // Destructure and exclude Department from updateData
    const { Department, ...filteredData } = updateData;

    // Update student record without Department
    students[index] = { ...students[index], ...filteredData };

    fs.writeFileSync(studentDataPath, JSON.stringify(students, null, 2), 'utf-8');
    console.log('✅ JSON update successful');

    res.status(200).json({ message: 'Student updated in JSON.', data: students[index] });
  } catch (error) {
    console.error('❌ JSON update error:', error);
    res.status(500).json({ message: 'JSON file update error', error: error.message });
  }
};

exports.deleteStudentFromJson = async (enrollment) => {
  try {
    console.log("\nYou are in deleteStudentFromJson function");

    console.log("\nReceived student Enrollment:", enrollment);

    // Step 1: Read existing student data from the JSON file
    const studentData = JSON.parse(fs.readFileSync(studentDataPath, 'utf-8'));

    // Step 2: Filter out the student with the given enrollment
    const updatedStudentData = studentData.filter(student => student.Enrollment !== enrollment);

    // Step 3: If no student were deleted (meaning it wasn't found), throw an error
    if (updatedStudentData.length === studentData.length) {
      throw new Error('Student not found in JSON file');
    }

    // Step 4: Write the updated student data back to the JSON file
    fs.writeFileSync(studentDataPath, JSON.stringify(updatedStudentData, null, 2), 'utf-8');
    console.log(`Student with Enrollment: ${enrollment} deleted from studentData.json`);

    return true;
  } catch (error) {
    console.error("❌ JSON Deletion Error:", error);
    throw error;
  }
};
