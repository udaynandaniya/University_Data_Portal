// const express = require('express');
// const router = express.Router();
// const UpdateRequest = require('../models/UpdateRequest');


// console.log("\n in /studentalumni/submit'")

// // Submit a request
// router.post('/studentalumni/submit', async (req, res) => {
//   let { userType, userId,oldName, programName, oldProgramName, requestData } = req.body;

//   console.log("\n in /studentalumni/submit'");
//   console.log(req.body); // Log the full request body for debugging

//   userType = userType.charAt(0).toUpperCase() + userType.slice(1);

//   console.log("\nupdated usertype :",userType); // Log the full request body for debugging

//   try {
//     // Check if the required fields are provided
//     if (!userType || !userId || !programName || !oldProgramName || !requestData) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Creating an update request document
//     const reqDoc = new UpdateRequest({
//       userType,              // Student, Faculty, Alumni
//       userId,                // Enrollment or Faculty ID
//       departmentName: requestData.Department || 'Unknown', // Handle department dynamic logic
//       oldName,
//       programName,           // New program (e.g., CIE, ICT, etc.)
//       oldProgramName,        // Old program name (before the change)
//       requestData,           // The entire data that the user is submitting (e.g., email, program, etc.)
//     });

//     // Save the document to the database
//     await reqDoc.save();

//     console.log("\nRespond with a success message")
//     res.json({ message: "Update request submitted" });
//   } catch (err) {
//     // Handle any errors that occur during saving
//     console.error("Error saving update request:", err);
//     res.status(500).json({ error: "Failed to submit request" });
//   }
// });

// // Get all requests for department
// router.get('/:departmentName', async (req, res) => {
//   try {
//     const requests = await UpdateRequest.find({ departmentName: req.params.departmentName });
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to load requests" });
//   }
// });


// router.put("/update-request/:id", async (req, res) => {

//   console.log("\n in update-request/:id ")
//   const { id } = req.params;
//   const { status } = req.body;
//  console.log(req.body)
//  console.log("id is :",id)
//   if (!["approved", "rejected"].includes(status)) {

//    console.log(status)

//     return res.status(400).json({ message: "Invalid status value." });
//   }

//   try {
//     const request = await UpdateRequest.findById(id);

//     if (!request) {
//     console.log("\nrequest cant find")

//       return res.status(404).json({ message: "Update request not found." });
//     }

//     request.status = status;
//     await request.save();

//     res.json({ message: `Update request marked as ${status}` });
//   } catch (err) {
//     console.error("❌ Failed to update request status:", err);
//     res.status(500).json({ message: "Server error while updating request." });
//   }
// });

// // 🔸 DELETE request by ID
// router.delete('/delete/:id', async (req, res) => {
//   const { id } = req.params;

//   console.log(`\n[DELETE] /delete/${id}`);

//   try {
//     const deleted = await UpdateRequest.findByIdAndDelete(id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Request not found or already deleted." });
//     }

//     console.log(`🗑️ Request ${id} deleted successfully.`);
//     res.json({ message: "Request deleted successfully." });
//   } catch (err) {
//     console.error("❌ Failed to delete request:", err);
//     res.status(500).json({ message: "Server error while deleting request." });
//   }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const UpdateRequest = require('../models/UpdateRequest');

console.log("\n [Router] /studentalumni/submit");

// 🔹 1. Submit a request (Student/Alumni)
router.post('/studentalumni/submit', async (req, res) => {
  let { userType, userId, oldName, programName, oldProgramName, requestData, } = req.body;

  console.log("➡️ Submit Request Body:", req.body);

  userType = userType.charAt(0).toUpperCase() + userType.slice(1); // Capitalize

  try {
    if (!userType || !userId || !programName || !oldProgramName || !requestData) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const reqDoc = new UpdateRequest({
      userType,
      userId,
      departmentName: requestData.Department || 'Unknown',
      oldName,
      programName,
      oldProgramName,
      requestData,
      isReadByDepart: false,
      isReadByStudent: true,
    });

    await reqDoc.save();

    console.log("✅ Update request submitted.,,,");
    res.json({ message: "Update request submitted" });

  } catch (err) {
    console.error("❌ Error saving update request:", err);
    res.status(500).json({ error: "Failed to submit request" });
  }
});

router.get('/countunread_deparment/:department', async (req, res) => {
  const department = req.params.department?.trim();

  console.log("\n📄## Counting unread update requests for department...");
  console.log("📥 Department received from client:", department);

  if (!department) {
  console.log("📥 Department is required");

    return res.status(400).json({ message: "Department is required" });
  }

  // Adjusted regex: allows dashes/spaces and avoids strict spacing issues
  const departmentRegex = new RegExp(`^B\\.TECH[-\\s]*${department}$`, "i");
  console.log("🔎 Searching where departmentName matches regex:", departmentRegex);

  try {
    const count = await UpdateRequest.countDocuments({
      programName: { $regex: departmentRegex },
      status: "pending",
      isReadByDepart: false
    });

    console.log(`✅ Found ${count} unread & pending requests for department "${department}"`);
    res.status(200).json({ count });
  } catch (error) {
    console.error("❌ Error fetching request count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/fetchpendingrequest/:department', async (req, res) => {
  const department = req.params.department?.trim();

  console.log("\n📄 fetchpendingrequest for department...");
  console.log("📥 Department received from client:", department);

  if (!department) {
    console.log("📥 Department is required");
    return res.status(400).json({ message: "Department is required" });
  }

  // Adjusted regex: allows dashes/spaces and avoids strict spacing issues
  const departmentRegex = new RegExp(`^B\\.TECH[-\\s]*${department}$`, "i");
  console.log("🔎 Searching where programName matches regex:", departmentRegex);

  try {
    // Removed isReadByDepart: false condition
    const requests = await UpdateRequest.find({
      programName: { $regex: departmentRegex },
      status: "pending"
    });

    console.log("\nFounded pending request(s):", requests);

    console.log("\n🧾 Founded pending request(s):", requests.length);

    // Mark these requests as read by department
    if (requests.length > 0) {
      const idsToUpdate = requests.map((r) => r._id);
      await UpdateRequest.updateMany(
        { _id: { $in: idsToUpdate }, isReadByDepart: false },
        { $set: { isReadByDepart: true } }
      );
      console.log("✅ Marked as read by department.");
    }


    res.status(200).json(requests); // Send response back with the data
  } catch (error) {
    console.error("❌ Error fetching pending request(s):", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




// 🔹 3. Department updates request status (approve/reject)
router.put('/update-request/:id', async (req, res) => {
  const { id } = req.params;
  const { status, message } = req.body; // message is optional (for rejection)

  console.log("➡️ Department status update request:", req.body);

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const request = await UpdateRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Update request not found." });
    }

    request.status = status;
    request.isReadByStudent = false; // Notify student now
    request.isReadByDepart = true;   // Mark as read for department

    // Default or custom message logic
    if (status === "approved") {
      request.message = "Your request update has been approved.";
    } else if (status === "rejected") {
      request.message = message || "Your request has been rejected. Please contact department for details.";
    }

    await request.save();

    res.json({ message: `Request marked as ${status}` });

  } catch (err) {
    console.error("❌ Failed to update status:", err);
    res.status(500).json({ message: "Server error while updating request." });
  }
});

// 🔹 4. Student/Alumni dismisses (reads) a notification → delete
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await UpdateRequest.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Request not found or already deleted." });
    }

    res.json({ message: "Notification deleted." });
  } catch (err) {
    console.error("❌ Failed to delete request:", err);
    res.status(500).json({ message: "Server error while deleting request." });
  }
});

// 🔹 5. Student/Alumni gets unread notifications (after status update)
router.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await UpdateRequest.find({
      userId,
      isReadByStudent: false,
      status: { $ne: 'pending' } // Only show approved or rejected
    });

    res.json(notifications);
  } catch (err) {
    console.error("❌ Failed to fetch notifications:", err);
    res.status(500).json({ message: "Server error while loading notifications." });
  }
});

module.exports = router;
