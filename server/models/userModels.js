// // // models =>usermodel.js

// // const mongoose = require("mongoose");

// // console.log("\n📦 models => usermodel.js");

// // const userSchema = new mongoose.Schema({
// //   SR: { type: String },
// //   Enrollment: { type: String, unique: true },  // Make unique if used for login
// //   Name: { type: String },
// //   Gender: { type: String },
// //   Program: { type: String },
// //   UniversitySeatNumber: { type: String },
// //   Whatsapp: { type: String },
// //   AcademicYear: { type: String },
// //   Password: { type: String },
// //   Email: { type: String, unique: true },        // Make unique if used for login
// //   Logged: { type: Boolean, default: false },


// // }, { timestamps: true }); // Adds createdAt and updatedAt

// // console.log("✅ Loaded user model");

// // module.exports = mongoose.model("User", userSchema);

// // models/User.js

// const mongoose = require("mongoose");

// console.log("📦 models => User.js");

// const userSchema = new mongoose.Schema(
//   {
//     Name: { type: String, required: true },
//     Email: { type: String, required: true },
//     role: { type: String },
   

//     LoggedIn: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.models.User || mongoose.model("User", userSchema);
