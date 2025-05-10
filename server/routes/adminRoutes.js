
const express = require('express');
const router = express.Router();



const {
  getAllUsers
} = require('../controllers/admin/adminController');


const { adminLogin } = require('../controllers/admin/adminLoginController');
const { updateDepartmentInJson, addDepartmentToJson } = require('../controllers/admin/admindepartjsonController');  // Import JSON update controller
const {deletepermentDepartment} = require('../controllers/admin/adminpermentDepartdeleteContoller');
const { deleteDepartment, getAllDepartments, updateDepartment } = require('../controllers/admin/admindepartController');
const { uploadDepartmentexcelData } = require('../controllers/admin/Upload/uploadDepartmentData');


console.log("\nroutes => adminRoutes");

router.post('/login', adminLogin);

router.get('/users', getAllUsers);


// Department Routes
router.get("/get-departments", getAllDepartments);
router.post("/add-department",addDepartmentToJson );
router.delete("/delete-department/:id",deleteDepartment);
router.delete("/permanent-delete-department", deletepermentDepartment);

router.put('/update-department/:id', updateDepartment)

router.put('/json-update-department/:id',updateDepartmentInJson) 


const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/upload-department-excel', upload.single('file'), uploadDepartmentexcelData);



const { downloadDepartmentJSON, downloadDepartmentDB } = require('../controllers/admin/Download/downloadController');

// ===== JSON FILE DOWNLOADS =====
router.get("/download-json/department", downloadDepartmentJSON);

// ===== DATABASE DOWNLOADS =====
router.get("/download-db/department", downloadDepartmentDB);

module.exports = router;
