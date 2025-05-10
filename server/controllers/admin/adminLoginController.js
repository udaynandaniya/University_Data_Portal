const fs = require('fs');
const path = require('path');

// ✅ Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Path to the AdminData.json file
    const adminDataPath = path.join(__dirname, "../../helpers/AdminData.json");

    // Read the admin data file
    fs.readFile(adminDataPath, 'utf8', (err, data) => {
      if (err) {
        console.error("❌ Error reading AdminData.json:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      // Parse the admin data
      const admins = JSON.parse(data);

      // Find the admin by email
      const admin = admins.find((admin) => admin.email === email);

      if (!admin) {
        console.log("❌ Admin with this email does not exist.");
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      // Check if the password matches
      if (admin.password !== password) {
        console.log("❌ Invalid password.");
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      console.log("✅ Admin logged in successfully");

      // Return success response
      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        adminId: admin.adminId, // Send the admin ID if needed
      });
    });
  } catch (error) {
    console.error("❌ Error in Admin Login", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { adminLogin };
