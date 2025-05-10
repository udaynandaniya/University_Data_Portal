
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./db/connectDB');
const UserRoute = require('./routes/UserRoute');
const VerifyEnrollmentRoute = require('./routes/verifyEnrollment'); // Add this line
const ProfileRoute = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const AuthRoute = require("./routes/authRoutes");

const facultyRoutes = require("./routes/facultyRoutes");

const facultyauthRoutes = require("./routes/facultyauthRoutes");

const departmentRoutes = require('./routes/departmentRoutes');

const StudentNavbarRoutes = require('./routes/StudentNavbarRoutes');

const updatedataRoutes = require('./routes/updateRequestsRoute');
const notificationRoutes = require('./routes/notifications');




const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

connectDB();
app.get('/', (req, res) => {
  res.send("API is working!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




app.use("/user", UserRoute);

app.use("/verify-enrollment", VerifyEnrollmentRoute); 
app.use("/auth", AuthRoute);


app.use("/profile", ProfileRoute);
app.use("/api", facultyRoutes);
app.use("/admin", adminRoutes);
app.use('/department', departmentRoutes);

app.use("/faculty-auth",facultyauthRoutes)

app.use("/Navbarstudent",StudentNavbarRoutes );
app.use('/updateRequests',updatedataRoutes);
app.use('/notifications',notificationRoutes);


console.log("\n in server.js /department  departmentRoutes" );
