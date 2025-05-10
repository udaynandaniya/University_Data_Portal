const Student = require("../../models/Student");
const Alumni = require("../../models/Alumni");
const Faculty = require("../../models/Faculty");

const getAllUsers = async (req, res) => {
  try {
    console.log("\n controllers=>admin=>adminController.js");

    console.log("📥 Fetching user counts...");

    // Count total students
    const totalStudents = await Student.countDocuments();
    // console.log(`Total Students Count: ${totalStudents}`);

    const loggedInStudents = await Student.countDocuments({ LoggedIn: true });
    // console.log(`Logged In Students Count: ${loggedInStudents}`);

    // Count total alumni
    const totalAlumni = await Alumni.countDocuments();
    // console.log(`Total Alumni Count: ${totalAlumni}`);

    const loggedInAlumni = await Alumni.countDocuments({ LoggedIn: true });
    // console.log(`Logged In Alumni Count: ${loggedInAlumni}`);

    // Count total faculty
    const totalFaculty = await Faculty.countDocuments();
    // console.log(`Total Faculty Count: ${totalFaculty}`);

    const loggedInFaculty = await Faculty.countDocuments({ LoggedIn: true });
    // console.log(`Logged In Faculty Count: ${loggedInFaculty}`);

    // Calculate total users across all roles
    const totalUsers = totalStudents + totalAlumni + totalFaculty;
    // console.log(`Total Users Across All Roles: ${totalUsers}`);

    // Calculate total logged-in users across all roles
    const totalLoggedIn = loggedInStudents + loggedInAlumni + loggedInFaculty;
    // console.log(`Total Logged-In Users Across All Roles: ${totalLoggedIn}`);

    // Send response with the calculated stats
    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalAlumni,
        totalFaculty,
        totalUsers,
        loggedInStudents,
        loggedInAlumni,
        loggedInFaculty,
        totalLoggedIn,
      },
    });

    console.log("✅ Fetched all user data successfully");
  } catch (error) {
    console.error("❌ Error fetching users", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllUsers };
