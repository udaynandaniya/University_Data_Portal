const fs = require('fs');
const path = require('path');
const alumniDataPath = path.join(__dirname, '../../../helpers/enrollmentData.json');
const sendMail = require("../../../Mail_manage/sendMails"); // Adjust this path as needed


// Function to add alumni data to the JSON file


exports.addAlumniInJson = async (req, res) => {
  console.log("\n➕ Adding new alumni (JSON only):", req.body);

  try {
    // Step 1: Load existing data
    console.log("📁 Checking if JSON file exists at:", alumniDataPath);
    let alumniList = [];
    if (fs.existsSync(alumniDataPath)) {
      const data = fs.readFileSync(alumniDataPath, "utf8");
      alumniList = JSON.parse(data);
      console.log(`📄 Loaded ${alumniList.length} existing alumni`);
    } else {
      console.warn("⚠️ File does not exist, will create new");
    }

    // Step 2: Prepare new alumni object
    const newAlumni = {
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

    console.log("📦 New alumni object:", newAlumni);

    // Step 3: Check for duplicates
    const alreadyExists = alumniList.some(
      (alumni) =>
        alumni.Enrollment?.trim() === newAlumni.Enrollment ||
        alumni.Email?.toLowerCase().trim() === newAlumni.Email
    );

    if (alreadyExists) {
      console.warn("❗ Duplicate alumni found, skipping addition.");
      return res.status(409).json({ message: "Alumni with this Enrollment or Email already exists." });
    }

    // Step 4: Save to JSON file
    alumniList.push(newAlumni);
    console.log("💾 Writing updated alumni list to file...");
    fs.writeFileSync(alumniDataPath, JSON.stringify(alumniList, null, 2));
    console.log("✅ Successfully written to JSON file");

    // Step 5: Send welcome email
    try {
      console.log("📧 Sending welcome email to:", newAlumni.Email);
      const subject = "Welcome to Adani University Portal";
      const text = `Dear ${newAlumni.Name},\n\nWelcome! You can now access the Adani University portal.\n\nRegards,\nAdani University`;
      const html = `<p>Dear <strong>${newAlumni.Name}</strong>,</p><p>Welcome! You can now access the <strong>Adani University portal</strong>.</p><p>Regards,<br/>Adani University</p>`;

      await sendMail(newAlumni.Email, subject, text, html);
      console.log("✅ Email sent successfully");
    } catch (emailErr) {
      console.error("❌ Email failed to send:", emailErr.message);
      // Optional: Still return success, or warn frontend
    }

    // Done
    return res.status(201).json({ message: "✅ Alumni added & welcome email sent!" });

  } catch (error) {
    console.error("❌ Error adding alumni or sending email:");
    console.error("📛 Error message:", error.message);
    console.error("📛 Stack trace:", error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.updateAlumniInJson = async (req, res) => {
  const { rollNo } = req.params;
  const updateData = req.body;

  console.log('\n📥 [JSON] Update Request Received');
  console.log('🔍 Roll No:', rollNo);
  console.log('📦 Update Data:', updateData);

  if (!rollNo) {
    return res.status(400).json({ message: 'Missing roll number in request.' });
  }

  try {
   
    const alumni = JSON.parse(fs.readFileSync(alumniDataPath, 'utf-8'));
    const index = alumni.findIndex(alum => alum.Enrollment === rollNo);

    if (index === -1) {
      console.warn(`⚠️ Alumni not found in JSON for Enrollment: ${rollNo}`);
      return res.status(404).json({ message: 'Alumni not found in JSON.' });
    }

    // Destructure and exclude Department from updateData
const { Department, ...filteredData } = updateData;

// Update alumni record without Department
alumni[index] = { ...alumni[index], ...filteredData };

    fs.writeFileSync(alumniDataPath, JSON.stringify(alumni, null, 2), 'utf-8');
    console.log('✅ JSON update successful');

    res.status(200).json({ message: 'Alumni updated in JSON.', data: alumni[index] });
  } catch (error) {
    console.error('❌ JSON update error:', error);
    res.status(500).json({ message: 'JSON file update error', error: error.message });
  }
};


  exports.deleteAlumniFromJson = async (enrollment) => {
    try {
      console.log("\nYou are in deleteAlumniFromJson frunction");

      console.log("\nReceived alumni Enrollment:", enrollment);
  
      // Step 1: Read existing alumni data from the JSON file
      const alumniData = JSON.parse(fs.readFileSync(alumniDataPath, 'utf-8'));
  
      // Step 2: Filter out the alumni with the given enrollment
      const updatedAlumniData = alumniData.filter(alumni => alumni.Enrollment !== enrollment);
  
      // Step 3: If no alumni were deleted (meaning it wasn't found), throw an error
      if (updatedAlumniData.length === alumniData.length) {
        throw new Error('Alumni not found in JSON file');
      }
  
      // Step 4: Write the updated alumni data back to the JSON file
      fs.writeFileSync(alumniDataPath, JSON.stringify(updatedAlumniData, null, 2), 'utf-8');
      console.log(`Alumni with Enrollment: ${enrollment} deleted from alumniData.json`);
  
      return true;
    } catch (error) {
      console.error("❌ JSON Deletion Error:", error);
      throw error;
    }
  };