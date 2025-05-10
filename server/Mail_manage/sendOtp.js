
// const nodemailer = require("nodemailer");
// const { setOtp } = require("./otpStore");

// const sendOtpToEmail = async (email, subject = "Your OTP", message = "Your OTP is: ") => {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   setOtp(email, otp); // ✅ Save OTP with expiry
 
//   console.log("Otp is :",otp)
//   console.log("\nsending from Mail_manage => sendOtp.js")

//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com", 
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject,
//     text: `${message}${otp}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("✅ OTP email sent to:", email);
//     return otp;
//   } catch (error) {
//     console.error("❌ Error sending OTP email:", error);
//     throw error;
//   }
// };

// module.exports = sendOtpToEmail;


const nodemailer = require("nodemailer");
const { setOtp } = require("./otpStore");

const sendOtpToEmail = async (email, subject = "Your OTP", message = "Your OTP is: ") => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  setOtp(email, otp); // Save OTP with expiry

  console.log("\n")

  console.log(`Generated OTP for ${email}: ${otp}`);

  console.log("\n")


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: `${message}${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`\n✅ OTP email sent to ${email}`);
    return otp;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw error;
  }
};

module.exports = sendOtpToEmail;
