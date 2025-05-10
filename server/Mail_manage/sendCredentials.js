const sendMail = require("./sendMails");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const sendCredentials = async (email) => {
  const randomUserId = crypto.randomBytes(4).toString("hex");
  const randomPassword = crypto.randomBytes(8).toString("hex");

console.log("\ni am at Mail_manage=> =>sendCredential  function \n")


// console.log(
//   `Generated credentials for ${email}:\nUser ID: ${randomUserId}\nPassword: ${randomPassword}`
// );

  const hashedPassword = await bcrypt.hash(randomPassword, 10);
  // console.log(`\nHashed password for ${email}: ${hashedPassword}`);

  // Simulate storing user credentials in a database
  const userCredentials = { email, userId: randomUserId, password: hashedPassword };
  console.log(" \nGenerated credentials object:", userCredentials);

  const subject = "Your Account Details";
  const text = `Your User ID is: ${randomUserId}\nYour Password is: ${randomPassword}`;
  const html = `<p>Your User ID is: <strong>${randomUserId}</strong></p><p>Your Password is: <strong>${randomPassword}</strong></p>`;

  // console.log(`\n sending user details to ${email}`);

  await sendMail(email, subject, text, html);
 console.log("\n")
  console.log(` succesfully send user details to ${email}`);
  console.log("\n")

};

module.exports = sendCredentials;
