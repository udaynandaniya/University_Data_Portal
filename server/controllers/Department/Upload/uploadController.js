const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// File paths for existing data
const studentJsonPath = path.join(__dirname, '../../../helpers/enrollmentData.json');
const facultyJsonPath = path.join(__dirname, '../../../helpers/FacultyData.json');

// Parse Excel file into JSON
const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(sheet);
};

// Merge new data with existing data
const mergeData = (existing, incoming, key) => {
  const existingIds = new Set(existing.map(item => item[key]));
  const filtered = incoming.filter(item => !existingIds.has(item[key]));
  return [...existing, ...filtered];
};

// Upload Student Data from Excel
exports.uploadStudentsExcel = (req, res) => {
  try {
    const newData = parseExcel(req.file.path);
    const existingData = JSON.parse(fs.readFileSync(studentJsonPath, 'utf-8'));
    const merged = mergeData(existingData, newData, 'Enrollment');
    fs.writeFileSync(studentJsonPath, JSON.stringify(merged, null, 2), 'utf-8');
    fs.unlinkSync(req.file.path); // Clean up the uploaded file
    res.status(200).json({ message: 'Student data uploaded successfully.', added: merged.length - existingData.length });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Error uploading student data.', error: err.message });
  }
};

// Upload Faculty Data from Excel
exports.uploadFacultyExcel = (req, res) => {
  try {
    const newData = parseExcel(req.file.path);
    const existingData = JSON.parse(fs.readFileSync(facultyJsonPath, 'utf-8'));
    const merged = mergeData(existingData, newData, 'FacultyID');
    fs.writeFileSync(facultyJsonPath, JSON.stringify(merged, null, 2), 'utf-8');
    fs.unlinkSync(req.file.path); // Clean up the uploaded file
    res.status(200).json({ message: 'Faculty data uploaded successfully.', added: merged.length - existingData.length });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Error uploading faculty data.', error: err.message });
  }
};
