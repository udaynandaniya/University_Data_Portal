const fs = require("fs");
const path = require("path");

const getEmailByEnrollment = (enrollment) => {
  try {
    console.log("\ngetEmailByEnrollment")
    const filePath = path.join(__dirname, "../helpers/enrollmentData.json"); // Adjust path if needed
    const rawData = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(rawData);

    const student = students.find((s) => s.Enrollment === enrollment);
    if (!student) {
      return null; // Not found
    }
 console.log("\n finded email in getEmailByEnrollment is ", student.Email)
    return student.Email;
  } catch (error) {
    console.error("❌ Error reading enrollment data:", error.message);
    return null;
  }
};

module.exports = getEmailByEnrollment;
