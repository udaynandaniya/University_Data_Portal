
// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/userController");


// console.log("\n routes=> => userRoute.js")
// router.post("/register", registerUser);
// router.post("/login", loginUser);



// module.exports = router;

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

const { resolveEnrollment } = require("../controllers/userController");

console.log("\n✅ routes => userRoute.js");
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/resolve-enrollment", resolveEnrollment);

module.exports = router;
