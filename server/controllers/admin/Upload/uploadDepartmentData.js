const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const departmentJsonPath = path.join(__dirname, '../../../helpers/departmentData.json');

// Parse Excel file into JSON
const parseExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet);
};

// Upload Department Data from Excel
exports.uploadDepartmentexcelData = (req, res) => {
  try {
    console.log("\nUpload Department Data from Excel");
    const newData = parseExcel(req.file.path);
    const existingData = JSON.parse(fs.readFileSync(departmentJsonPath, 'utf-8'));

    // Create a map for quick updates
    const existingMap = new Map();
    existingData.forEach(dept => {
      existingMap.set(dept.DepartmentId, dept);
    });

    // Merge (override existing with same DepartmentId)
    newData.forEach(dept => {
      existingMap.set(dept.DepartmentId, dept);
    });

    const merged = Array.from(existingMap.values());

    fs.writeFileSync(departmentJsonPath, JSON.stringify(merged, null, 2), 'utf-8');
    fs.unlinkSync(req.file.path); // Remove uploaded file

    res.status(200).json({
      message: 'Department data uploaded successfully.',
      total: merged.length,
      addedOrUpdated: newData.length,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      message: 'Error uploading department data.',
      error: err.message,
    });
  }
};
