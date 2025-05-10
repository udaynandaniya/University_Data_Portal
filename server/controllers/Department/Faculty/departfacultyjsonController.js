const fs = require('fs');
const path = require('path');
const sendMail = require("../../../Mail_manage/sendMails"); // Adjust path if needed

const facultyDataPath = path.join(__dirname, '../../../helpers/facultyData.json');

// Add faculty to JSON
exports.addFacultyInJson = async (req, res) => {
  console.log("\n➕ Adding new faculty (JSON only):", req.body);

  try {
    // Step 1: Load existing data
    console.log("📁 Checking if JSON file exists at:", facultyDataPath);
    let facultyList = [];
    if (fs.existsSync(facultyDataPath)) {
      const data = fs.readFileSync(facultyDataPath, "utf8");
      facultyList = JSON.parse(data);
      console.log(`📄 Loaded ${facultyList.length} existing faculty records`);
    } else {
      console.warn("⚠️ File does not exist, will create new");
    }

    // Step 2: Prepare new faculty object
    const newFaculty = {
      Name: req.body.Name?.trim(),
      FacultyID: req.body.FacultyID?.trim(),
      Department: req.body.Department?.trim(),
      Phone: req.body.Phone?.trim(),
      Email: req.body.Email?.trim().toLowerCase(),
      Designation: req.body.Designation?.trim().toLowerCase(),

    };

    console.log("📦 New faculty object:", newFaculty);

    // Step 3: Check for duplicates
    const alreadyExists = facultyList.some(
      (faculty) =>
        faculty.FacultyID === newFaculty.FacultyID ||
        faculty.Email === newFaculty.Email
    );

    if (alreadyExists) {
      console.warn("❗ Duplicate faculty found, skipping addition.");
      return res.status(409).json({ message: "Faculty with this Employee ID or Email already exists." });
    }

    // Step 4: Save to JSON file
    facultyList.push(newFaculty);
    fs.writeFileSync(facultyDataPath, JSON.stringify(facultyList, null, 2));
    console.log("✅ Successfully written to JSON file");

    // Step 5: Send welcome email
    try {
      console.log("📧 Sending welcome email to:", newFaculty.Email);
      const subject = "Welcome to Adani University Portal";
      const text = `Dear ${newFaculty.Name},\n\nWelcome! You can now access the Adani University portal.\n\nRegards,\nAdani University`;
      const html = `<p>Dear <strong>${newFaculty.Name}</strong>,</p><p>Welcome! You can now access the <strong>Adani University portal</strong>.</p><p>Regards,<br/>Adani University</p>`;

      await sendMail(newFaculty.Email, subject, text, html);
      console.log("✅ Email sent successfully");
    } catch (emailErr) {
      console.error("❌ Email failed to send:", emailErr.message);
    }

    return res.status(201).json({ message: "✅ Faculty added & welcome email sent!" });

  } catch (error) {
    console.error("❌ Error adding faculty or sending email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update faculty in JSON

// exports.updateFacultyInJson = async (req, res) => {
//     const { facultyId } = req.params;
//     const updateData = req.body;
  
//     console.log('\n📥 [JSON] Update Request Received');
//     console.log('🔍 Faculty ID:', facultyId);
//     console.log('📦 Update Data:', updateData);
  
//     if (!facultyId) {
//       return res.status(400).json({ message: 'Missing faculty ID in request.' });
//     }
  
//     try {
//       const faculty = JSON.parse(fs.readFileSync(facultyDataPath, 'utf-8'));
  
//       // Match using correct key from your JSON data: FacultyID
//       const index = faculty.findIndex(fac => fac.FacultyID === facultyId);
  
//       if (index === -1) {
//         console.warn(`⚠️ Faculty not found in JSON for Faculty ID: ${facultyId}`);
//         return res.status(404).json({ message: 'Faculty not found in JSON.' });
//       }
  
//       // Update fields (optional: filter fields here if needed)
//       faculty[index] = { ...faculty[index], ...updateData };
  
//       fs.writeFileSync(facultyDataPath, JSON.stringify(faculty, null, 2), 'utf-8');
//       console.log('✅ JSON update successful');
  
//       res.status(200).json({ message: 'Faculty updated in JSON.', data: faculty[index] });
//     } catch (error) {
//       console.error('❌ JSON update error:', error);
//       res.status(500).json({ message: 'JSON file update error', error: error.message });
//     }
//   };


exports.updateFacultyInJson = async (req, res) => {
  const { facultyId } = req.params;
  const updateData = req.body;

  console.log('\n📥 [JSON] Update Request Received');
  console.log('🔍 Faculty ID:', facultyId);
  console.log('📦 Update Data:', updateData);

  if (!facultyId) {
    return res.status(400).json({ message: 'Missing faculty ID in request.' });
  }

  try {
    const facultyList = JSON.parse(fs.readFileSync(facultyDataPath, 'utf-8'));
    const index = facultyList.findIndex(fac => fac.FacultyID === facultyId);

    if (index === -1) {
      console.warn(`⚠️ Faculty not found in JSON for Faculty ID: ${facultyId}`);
      return res.status(404).json({ message: 'Faculty not found in JSON.' });
    }

    // ❌ Remove unwanted fields like "Verified"
    const { Verified, LoggedIn, ...filteredData } = updateData;

    // ✅ Merge only allowed fields into the existing faculty entry
    facultyList[index] = { ...facultyList[index], ...filteredData };

    fs.writeFileSync(facultyDataPath, JSON.stringify(facultyList, null, 2), 'utf-8');
    console.log('✅ JSON update successful');

    res.status(200).json({ message: 'Faculty updated in JSON.', data: facultyList[index] });
  } catch (error) {
    console.error('❌ JSON update error:', error);
    res.status(500).json({ message: 'JSON file update error', error: error.message });
  }
};

// Delete faculty from JSON
// exports.deleteFacultyFromJson = async (facultyId) => {
//   try {
//     console.log("\n🗑️ Deleting faculty from JSON by Employee ID:", facultyId);

//     const facultyData = JSON.parse(fs.readFileSync(facultyDataPath, 'utf-8'));
//     const updatedFacultyData = facultyData.filter(fac => fac.FacultyId !== FacultyId);

//     if (updatedFacultyData.length === facultyData.length) {
//       throw new Error('Faculty not found in JSON file');
//     }

//     fs.writeFileSync(facultyDataPath, JSON.stringify(updatedFacultyData, null, 2), 'utf-8');
//     console.log(`✅ Faculty with Employee ID ${facultyId} deleted from facultyData.json`);

//     return true;
//   } catch (error) {
//     console.error("❌ JSON Deletion Error:", error);
//     throw error;
//   }
// };
exports.deleteFacultyFromJson = async (facultyId) => {
    try {
      console.log("\n🗑️ Deleting faculty from JSON by Faculty ID:", facultyId);
  
      const facultyData = JSON.parse(fs.readFileSync(facultyDataPath, 'utf-8'));
  
      // Correct comparison
      const updatedFacultyData = facultyData.filter(fac => fac.FacultyID !== facultyId);
  
      if (updatedFacultyData.length === facultyData.length) {
        throw new Error('Faculty not found in JSON file');
      }
  
      fs.writeFileSync(facultyDataPath, JSON.stringify(updatedFacultyData, null, 2), 'utf-8');
      console.log(`✅ Faculty with Faculty ID ${facultyId} deleted from facultyData.json`);
  
      return true;
    } catch (error) {
      console.error("❌ JSON Deletion Error:", error);
      throw error;
    }
  };
  