

const fs = require('fs');
const path = require('path');
const departmentDataPath = path.join(__dirname, '../../helpers/departmentData.json');

// Function to update department in the JSON file
// exports.updateDepartmentInJson = async (req, res) => {
//   const { id } = req.params; // Get the department ID from the URL (this is the MongoDB ObjectId)
//   const { DepartmentId, Name, Email,Department_head, oldDepartmentId } = req.body; // Get data from the request body

//   try {
//     console.log(`Received request to update department with ID: ${id}`);
//     console.log(`Updated data: DepartmentId: ${DepartmentId}, Name: ${Name}, Email: ${Email}`);
    
//     // Step 1: Read the existing department data from the JSON file
//     console.log("Reading departments data from the JSON file...");
//     const departments = JSON.parse(fs.readFileSync(departmentDataPath, 'utf-8'));

//     // Step 2: Check if oldDepartmentId is provided
//     if (!oldDepartmentId) {
//       return res.status(400).json({ error: "Missing oldDepartmentId in the request" });
//     }

//     console.log(`Looking for department with OLD DepartmentId: ${oldDepartmentId}`);

//     let departmentUpdated = false;
//     const updatedDepartments = departments.map((department) => {
//       // Step 2B: Compare the `oldDepartmentId` to the current DepartmentId in the JSON
//       if (department.DepartmentId === oldDepartmentId) { // Match with the `oldDepartmentId`
//         console.log(`Found department with OLD DepartmentId: ${department.DepartmentId}`);
        
//         // Step 2C: Update the department fields with the new data from the request
//         department.DepartmentId = DepartmentId || department.DepartmentId;  // Only update if the new data is present
//         department.Name = Name || department.Name;  // Only update if the new data is present
//         department.Email = Email || department.Email;

//         departmentUpdated = true;
//         return department; // Return the updated department object
//       }
//       return department; // Return unchanged department object
//     });

//     // Step 3: If no department was updated, return a 404 error
//     if (!departmentUpdated) {
//       console.log(`Department with OLD DepartmentId: ${oldDepartmentId} not found in the JSON file.`);
//       return res.status(404).json({ error: "Department not found in JSON file" });
//     }

//     // Step 4: Log the updated departments data before writing
//     console.log("Updated departments data:", updatedDepartments);

//     // Step 5: Write the updated department list back to the JSON file
//     console.log("Writing the updated department data back to the JSON file...");
//     fs.writeFileSync(departmentDataPath, JSON.stringify(updatedDepartments, null, 2), 'utf-8');
    
//     // Step 6: Log the file content to check if it's been updated
//     const fileContent = fs.readFileSync(departmentDataPath, 'utf-8');
//     console.log("Current content of departmentData.json:", fileContent);

//     // Step 7: Respond with a success message
//     res.status(200).json({
//       success: true,
//       message: "✅ Department updated successfully in JSON file",
//     });
//   } catch (error) {
//     // If something goes wrong during the update process, catch the error
//     console.error("❌ JSON Update Error:", error);
//     res.status(500).json({ error: "Failed to update department in JSON file" });
//   }
// };
exports.updateDepartmentInJson = async (req, res) => {
  console.log("\n i am in updateDepartmentInJson")
  const { id } = req.params;
  const { DepartmentId, Name, Email, Department_head, oldDepartmentId } = req.body;
   
  console.log("\n req.body is ",req.body)
  console.log("\n oldDepartmentId is ",id)




  try {
    const departments = JSON.parse(fs.readFileSync(departmentDataPath, 'utf-8'));

    console.log("\ndepartments :",departments)
    let departmentUpdated = false;
    const updatedDepartments = departments.map((dept) => {
      if (dept.DepartmentId === id) {
        dept.DepartmentId = DepartmentId;
        dept.Name = Name;
        dept.Department_head = Department_head;
        dept.Email = Email;
        departmentUpdated = true;
      }
      return dept;
    });

    if (!departmentUpdated) {
      return res.status(404).json({ error: "Department not found in JSON" });
    }

    fs.writeFileSync(departmentDataPath, JSON.stringify(updatedDepartments, null, 2), 'utf-8');
    res.status(200).json({ success: true, message: "JSON updated successfully" });
    console.log("\nsuccesfully update..");
  
  } catch (error) {
    console.error("Update JSON Error:", error);
    res.status(500).json({ error: "Failed to update department in JSON" });
  }
};

exports.addDepartmentToJson = async (req, res) => {
    try {
      console.log("Inside addDepartmentToJson function");
      const { DepartmentId, Name, Email, Department_head,Password } = req.body;
       
      console.log("\n req.body is ",req.body)
    
    
    
  
      // Step 1: Read the existing department data from the JSON file
      const departments = JSON.parse(fs.readFileSync(departmentDataPath, 'utf-8'));
  
      console.log("\ncurrenct json file :",departments)

      // Step 2: Create a new department object
      const newDepartment = {
        DepartmentId: DepartmentId,
        Name: Name,
        Department_head : Department_head,
        Email: Email,
        Password: Password , // Handle password field accordingly
      };
      // Step 3: Check for duplicates
      console.log("\n Check for duplicates")
        const isDuplicate = departments.some(dept =>
          dept.DepartmentId === newDepartment.DepartmentId ||
          dept.Email === newDepartment.Email
        );

        if (isDuplicate) {
          console.log("\nPlease add unique department data. DepartmentId or Email already exists.")
         return res.status(400).json({ message: "Please add unique department data. DepartmentId or Email already exists." });
        } else {
  
      // Step 3: Add the new department to the array
      departments.push(newDepartment);
      console.log("New department added to the array:", newDepartment);
      
  
      // Step 4: Write the updated department data back to the JSON file
      fs.writeFileSync(departmentDataPath, JSON.stringify(departments, null, 2), 'utf-8');

      console.log("\nupdated json file :",departments)

      console.log("New department successfully added to departmentData.json");
      return res.status(201).json({ success: true, message: "New department succesfully add in DepartmentJSON" });

        }
    } catch (error) {
      console.error("Error adding department to JSON file:", error);
      throw new Error("Failed to update departmentData.json");
    }
  };

  exports.deleteDepartmentFromJson = async (DepartmentId) => {
    try {
        console.log("\nreceived departmentId is :",DepartmentId)
      // Step 1: Read the existing department data from the JSON file
      const departments = JSON.parse(fs.readFileSync(departmentDataPath, 'utf-8'));
  
      // Step 2: Filter out the department by DepartmentId
      const updatedDepartments = departments.filter(department => department.DepartmentId !== DepartmentId);
  
      // If no department is deleted (meaning it wasn't found), throw an error
      if (updatedDepartments.length === departments.length) {
        throw new Error('Department not found in JSON file');
      }
  
      // Step 3: Write the updated departments list back to the JSON file
      fs.writeFileSync(departmentDataPath, JSON.stringify(updatedDepartments, null, 2), 'utf-8');
      console.log(`Department with DepartmentId: ${DepartmentId} deleted from departmentData.json`);
  
      return true;
    } catch (error) {
      console.error("❌ JSON Deletion Error:", error);
      throw error;
    }
  };