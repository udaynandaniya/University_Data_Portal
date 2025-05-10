const express = require('express');
const router = express.Router();


const {
  getAllStudents,
  deleteStudent,
  updateStudentInMongoDB
} = require('../controllers/Department/Student/studentController');

const {
  getAllAlumni,
  updateAlumniInMongoDB,
  deleteAlumni
} = require('../controllers/Department/Alumni/alumniController');


const { sendWelcomeEmail, sendUpdateEmail } = require('../controllers/Department/emailController');
const { departmentLogin } = require('../controllers/Department/loginController');
const { deletePermanentAlumni } = require('../controllers/Department/Alumni/departalumnipermentdeleteController');
const { updateAlumniInJson, addAlumniInJson, AlumniCheckInJson } = require('../controllers/Department/Alumni/departalumnijsonController');
const { addStudentInJson, updateStudentInJson } = require('../controllers/Department/Student/departstudentjsonController');
const { deletePermanentStudent } = require('../controllers/Department/Student/departstudentpermentdeleteController');
const { StudentToAlumni } = require('../controllers/Department/Student/departStudenttoAlumni');


console.log("\n i am at departmentRoutes.js")


//login routes
router.post("/login", departmentLogin);

// // Faculty Routes
// router.get("/get-faculty", getAllFaculty);
// router.post("/add-faculty", addFaculty);
// router.put("/update-faculty/:id", updateFaculty);
// router.delete("/delete-faculty/:id", deleteFaculty);

const {
  getAllFaculty,
  updateFacultyInMongoDB,
  deleteFaculty
} = require('../controllers/Department/Faculty/facultyController');

const {
  addFacultyInJson,
  updateFacultyInJson,
  deleteFacultyFromJson
} = require('../controllers/Department/Faculty/departfacultyjsonController');
const { deletePermanentFaculty } = require('../controllers/Department/Faculty/departfacultypermentdeleteController');

// Faculty Routes

router.get("/get-faculty",getAllFaculty);
router.post("/add-faculty", addFacultyInJson);
// // Update faculty in MongoDB and log incoming data
router.put("/mongoDB-update-faculty/:id", (req, res, next) => {
  console.log("📝 Received faculty update data:", req.body);
  next();
}, updateFacultyInMongoDB);

//Add a JSON update route if needed in the future
 router.put("/json-update-faculty/:facultyId", updateFacultyInJson);

router.delete("/delete-faculty/:id", deleteFaculty);

// // Optional: For hard delete similar to alumni
 router.delete("/permanent-delete-faculty/:id", deletePermanentFaculty);




// Student Routes
router.get("/get-students", getAllStudents);
router.post("/add-student", addStudentInJson);
// Update student in MongoDB (log received data from frontend)
router.put("/mongoDB-update-student/:id", (req, res, next) => {
  console.log("📥 Received data to update student in MongoDB:", req.body);
  updateStudentInMongoDB(req, res, next);
});
// Update student in JSON
router.put("/json-update-student/:rollNo", updateStudentInJson);
// Delete student (soft delete)
router.delete("/delete-student/:id", deleteStudent);
// Permanent delete
router.delete("/permanent-delete-student/:id", deletePermanentStudent);
router.post('/transfer-students-to-alumni', StudentToAlumni)


// Alumni Routes
router.get("/get-alumni", getAllAlumni);
router.post("/add-alumni", addAlumniInJson);
//update alumni in mongoDB  // here add what receive data from frotend in console point
router.put("/mongoDB-update-alumni/:id", updateAlumniInMongoDB);
//update alumni in json
router.put("/json-update-alumni/:rollNo", updateAlumniInJson);
router.delete("/delete-alumni/:id", deleteAlumni);
router.delete("/permanent-delete-alumni/:id", deletePermanentAlumni);



// Email Routes (Welcome, Update)
router.post("/send-welcome-email", sendWelcomeEmail);
router.post("/send-update-email", sendUpdateEmail);




const multer = require('multer');
const { uploadStudentsExcel, uploadFacultyExcel } = require('../controllers/Department/Upload/uploadController');
// Multer config for Excel uploads
const upload = multer({ dest: 'uploads/' });

// Student upload
router.post('/upload-students-excel', upload.single('file'), uploadStudentsExcel);

// Faculty upload
router.post('/upload-faculty-excel', upload.single('file'), uploadFacultyExcel);


const downloadController = require("../controllers/Department/Download/downloadController");

// ===== JSON FILE DOWNLOADS =====
router.get("/download-json/student", downloadController.downloadStudentJSON);
router.get("/download-json/faculty", downloadController.downloadFacultyJSON);

// ===== DATABASE DOWNLOADS =====
router.get("/download-db/student", downloadController.downloadStudentDB);
router.get("/download-db/alumni", downloadController.downloadAlumniDB);
router.get("/download-db/faculty", downloadController.downloadFacultyDB);

module.exports = router;
