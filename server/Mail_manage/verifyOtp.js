const { otpStore } = require("./otpStore");

const verifyOtp = async (req, res) => {

  console.log("\nReq body of verifyotp :",req.body)

  const { email, otp } = req.body;

  console.log("\nReq body of verifyotp :",req.body)

  console.log("\ncontroller => verifyOtp.js : verifyOtp function");


  console.log(`\nReceived OTP for ${email}: ${otp}`);

  const record = otpStore[email];
  console.log("Stored OTP record:", record);

  if (!record) {
    console.log(`No OTP found for ${email}`);
    return res.status(400).json({ success: false, message: "No OTP found for this email" });
  }

  if (record.otp === otp && Date.now() < record.expires) {
    try {
      // console.log("\n succesfully verified otp \n")
      console.log(`OTP for ${email} is valid, proceeding to send credentials...`);
   
      console.log("/n i am at  Mail_manage => verifyOtp.js ");

    // console.log("\nYou can now request credentials from frontend\n");  console.log("typeof email:", typeof email);
     
    console.log("email:", email);
      
      delete otpStore[email]; // Remove OTP from store
      return res.json({ success: true, message: "OTP verified and credentials sent to your email" });
    } catch (error) {
      console.error("❌ Error sending credentials:", error);
      return res.status(500).json({ success: false, message: "Error sending credentials" });
    }
  } else {
    console.log(`Invalid or expired OTP for ${email}`);
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
};

module.exports = verifyOtp;
