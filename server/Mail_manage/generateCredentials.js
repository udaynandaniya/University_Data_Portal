// Mail_manage/generateCredentials.js

const sendCredentials = require("./sendCredentials");

// Email format validation regex
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const generateCredentials = async (req, res) => {
  try {
    const { email } = req.body;

    // Log the incoming request
    console.log("/n");

    console.log(`Received request to generate credentials for email: ${email}`);
    console.log("/n");
    
    // Check if email is provided and is valid
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      console.log("Invalid email format");
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Log before sending credentials
    console.log("/n i am at  Mail_manage => generateCredentials.js ");
    
    console.log(`Sending credentials to email: ${email}`);
    
    // console.log("/n going to Mail_manage => sendCredentials.js");

    // Call the function to send credentials
    await sendCredentials(email);

    console.log("/n Back to  Mail_manage => generateCredentials.js");

    
    // Log after sending credentials successfully
    console.log(`Credentials successfully sent to email: ${email}`);
    
    // Send success response
    return res.json({ success: true, message: "Credentials sent to email" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error generating credentials:", error);
    
    // Send failure response
    return res.status(500).json({ success: false, message: "Failed to generate credentials" });
  }
};

module.exports = generateCredentials;
