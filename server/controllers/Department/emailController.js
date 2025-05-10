const sendMail = require("../../Mail_manage/sendMails"); // Import sendMail from Mail_manage folder

// Send Welcome Email
const sendWelcomeEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    // You can customize the subject, text, and HTML message as per your need
    await sendMail(to, subject || "Welcome to Our Platform", text || "Thank you for joining us!", html || "<h1>Welcome!</h1><p>Thank you for joining us!</p>");
    return res.status(200).json({ success: true, message: "Welcome email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    return res.status(500).json({ success: false, message: "Error sending welcome email" });
  }
};

// Send Update Email
const sendUpdateEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    // Customize your email content based on the context
    await sendMail(to, subject || "Important Update", text || "There is an important update for you.", html || "<h1>Important Update</h1><p>There is an important update for you.</p>");
    return res.status(200).json({ success: true, message: "Update email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending update email:", error);
    return res.status(500).json({ success: false, message: "Error sending update email" });
  }
};

module.exports = { sendWelcomeEmail, sendUpdateEmail };
