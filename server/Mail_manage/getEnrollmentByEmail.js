const fs = require("fs");
const path = require("path");

const getEnrollmentByEmail = (email) => {
  try {
    console.log("\ngetEnrollmentByEmail");
    const filePath = path.join(__dirname, "../helpers/enrollmentData.json"); // Adjust path if needed
    const rawData = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(rawData);

    const student = students.find((s) => s.Email === email);
    if (!student) {
      return null; // Not found
    }

    console.log("\nFound enrollment in getEnrollmentByEmail:", student.Enrollment);
    return student.Enrollment;
  } catch (error) {
    console.error("❌ Error reading enrollment data:", error.message);
    return null;
  }
};

module.exports = getEnrollmentByEmail;
