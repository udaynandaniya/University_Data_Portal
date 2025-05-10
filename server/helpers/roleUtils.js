// helpers/roleUtils.js
function determineUserRole(academicYear) {
    if (!academicYear) return "Student"; // Default fallback
  
    try {
      const [startYearStr] = academicYear.split("-");
      const startYear = parseInt("20" + startYearStr.slice(-2));
      const courseEndDate = new Date(`${startYear + 4}-06-30`);
      return new Date() <= courseEndDate ? "Student" : "Alumni";
    } catch (err) {
      console.error("❌ Error parsing academicYear:", academicYear, err);
      return "Student"; // Safe fallback
    }
  }
  
  module.exports = { determineUserRole };
  