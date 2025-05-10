
// const nodemailer = require("nodemailer");
// require("dotenv").config({ path: __dirname + '/../.env' }); // Load env from parent folder

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, 
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// async function sendMail(to, subject, text, html) {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//       html
//     });
//     console.log("✅ Email sent: ", info.response);
//   } catch (err) {
//     console.error("❌ Email sending error:", err);
//   }
// }

// module.exports = sendMail;

const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + '/../.env' });

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    });
    console.log(`\n✅ Email sent to ${to}:`, info.response);
  } catch (err) {
    console.error("❌ Email sending error:", err);
  }
}

module.exports = sendMail;
