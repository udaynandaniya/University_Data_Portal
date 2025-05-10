

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported
const Department = require('../../models/Department'); // Import the Department model

console.log("\n controllers => departmentLoginController.js");

const departmentLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log("\n controllers => departmentLoginController.js => departmentLogin");
  console.log("Login request received:", { email, password });
  console.log("\n 11111 ");

  try {
    // Define the file path where the department data is stored
    const filePath = path.join(__dirname, '../../helpers/departmentData.json');

    // Read the data from the JSON file
    const data = fs.readFileSync(filePath, 'utf8');
    console.log("\n 222222");

    // Parse the JSON data into an array of departments
    const departments = JSON.parse(data);

    // Find the department matching the email entered by the user
    const department = departments.find((dept) => dept.Email === email);

    console.log("\n 333333");
    console.log("Department from JSON:", department);

    // If the department is not found in the JSON file, send an error response
    if (!department) {
      console.log("❌ Department not found for email:", email);
      return res.status(400).json({ success: false, message: 'Department not found' });
    }

    // Compare the entered password with the password stored in the JSON file
    const isMatch = password === department.Password;
    if (!isMatch) {
      console.log("❌ Invalid password for department:", email);
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // If the password is correct, create a new Department record in MongoDB
    const hashedPassword = await bcrypt.hash(department.Password, 10); // Hash the password

    // Create a new department document with the data from the JSON file and hashed password
    const newDepartment = new Department({
      DepartmentId: department.DepartmentId,
      Name: department.Name,
      Department_head: department.Department_head,
      Email: department.Email,
      Password: hashedPassword, // Store the hashed password in the database
    });
  console.log("\n newDepartment",newDepartment)
    // Save the new department document in MongoDB
    await newDepartment.save();

    console.log("✅ Department Login Successful:", department.DepartmentId);
   
   
    console.log("\n in backend departmentName :",department.Name)
   
    // Return a successful login response along with the departmentId
    res.status(200).json({
      success: true,
      message: 'Department login successful',
      departmentId: department.DepartmentId,
      departmentName: department.Name, 
    });

    console.log("\n 444444");
  } catch (err) {
    console.error("Department login error:", err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { departmentLogin };



// const fs = require('fs');
// const path = require('path');
// const bcrypt = require('bcryptjs');
// const Department = require('../../models/Department');

// console.log("\n controllers => departmentLoginController.js");

// const departmentLogin = async (req, res) => {
//   const { email, password } = req.body;

//   console.log("\n controllers => departmentLoginController.js => departmentLogin");
//   console.log("Login request received:", { email, password });
//   console.log("\n 11111 ");

//   try {
//     // ✅ Check if department already exists in MongoDB
//     let department = await Department.findOne({ Email: email });

//     if (!department) {
//       // If not in DB, read from JSON file
//       const filePath = path.join(__dirname, '../../helpers/departmentData.json');
//       const data = fs.readFileSync(filePath, 'utf8');
//       console.log("\n 222222");

//       const departments = JSON.parse(data);
//       const deptFromJson = departments.find((dept) => dept.Email === email);
//       console.log("\n 333333");
//       console.log("Department from JSON:", deptFromJson);

//       if (!deptFromJson) {
//         console.log("❌ Department not found for email:", email);
//         return res.status(400).json({ success: false, message: 'Department not found' });
//       }

//       const isMatch = password === deptFromJson.Password;
//       if (!isMatch) {
//         console.log("❌ Invalid password for department (JSON):", email);
//         return res.status(400).json({ success: false, message: 'Invalid credentials' });
//       }

//       // ✅ Hash and insert to DB if login is valid
//       const hashedPassword = await bcrypt.hash(deptFromJson.Password, 10);
//       department = new Department({
//         DepartmentId: deptFromJson.DepartmentId,
//         Name: deptFromJson.Name,
//         Email: deptFromJson.Email,
//         Password: hashedPassword,
//       });

//       await department.save();
//       console.log("✅ Department added to DB on first login:", deptFromJson.Name);
//     } else {
//       // ✅ If department already in DB, compare password
//       const isMatch = await bcrypt.compare(password, department.Password);
//       if (!isMatch) {
//         console.log("❌ Invalid password for department (DB):", email);
//         return res.status(400).json({ success: false, message: 'Invalid credentials' });
//       }
//     }

//     console.log("✅ Department Login Successful:", department.DepartmentId);
//     console.log("\n in backend departmentName :", department.Name);

//     return res.status(200).json({
//       success: true,
//       message: 'Department login successful',
//       departmentId: department.DepartmentId,
//       departmentName: department.Name,
//     });

//   } catch (err) {
//     console.error("❌ Department login error:", err);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// module.exports = { departmentLogin };
