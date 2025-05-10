const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword , changePassword } = require("../controllers/authController");


console.log("\n routes => authroutes.js")

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/change-password", changePassword);

module.exports = router;
