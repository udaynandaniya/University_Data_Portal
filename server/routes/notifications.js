// routes/notifications.js
const express = require("express");
const router = express.Router();
const UpdateRequest = require("../models/UpdateRequest"); 

router.get("/student/student_fetching_notification_data/:enrollment", async (req, res) => {
  const enrollment = req.params.enrollment;

  console.log("\nGET notifications for a student for this enrollment:", enrollment);

  try {
    // Fetch unread notifications
    const notifications = await UpdateRequest.find({
      userId: enrollment,
      status: { $ne: "pending" }
    });

    if (notifications.length > 0) {
      // Update the notifications and set isReadByStudent to true
      await UpdateRequest.updateMany(
        { userId: enrollment, isReadByStudent: false },
        { $set: { isReadByStudent: true } }
      );

      console.log("✅ Successfully updated notifications to read");
    }

    // Return the notifications (if any)
    res.json(notifications);
  } catch (err) {
    console.error("Error fetching student notifications:", err);
    res.status(500).json({ error: "Server error while fetching notifications" });
  }
});



router.get("/unread_by_student/:enrollment", async (req, res) => {
  const enrollment = req.params.enrollment;

  console.log("\nGET unread_by_student notifications for a student for this enrollment:", enrollment);

  try {
    // Fetch unread notifications
    const notifications = await UpdateRequest.find({
      userId: enrollment,
      isReadByStudent: false,
      status: { $ne: "pending" }
    });

    

    // Return the notifications (if any)
    res.json(notifications);
  } catch (err) {
    console.error("Error fetching student notifications:", err);
    res.status(500).json({ error: "Server error while fetching notifications" });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log("\n id")
  try {
    const notification = await UpdateRequest.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting notification", error: err });
  }
});


module.exports = router;
