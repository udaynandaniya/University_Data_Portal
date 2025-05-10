

import { Routes, Route } from "react-router-dom";

import ForgotPassword from "./components/ForgotPassword";
import First from "./pages/First";


 import AdminLogin from "./user/Admin/components/AdminLogin";

//student
import Home from "./user/Student/components/Home";
import Student from "./user/Student/components/Student"
import Alumni from "./user/Student/components/Alumni"
import Login from "./user/Student/components/Login"
import Signup from "./user/Student/components/Signup"
import Delete from "./user/student/pages/Delete";



//faculty
import FacultySignup from "./user/Faculty/components/FacultySignup";
import FacultyLogin from "./user/Faculty/components/FacultyLogin";
import FacultyDashboard from "./user/Faculty/components/FacultyDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./user/Admin/components/AdminDashboard";

import ChangePassword from "./user/Student/components/ChangePassword";
// import Dashboard from "./components/Dashboard";
import DepartmentLogin from "./user/Department/components/DepartmentLogin";
import DepartmentDashboard from "./user/Department/page/DepartmentDashboard";
import StudentAlumniManager from "./user/Department/page/StudentManager";
import FacultyManager from "./user/Department/page/FacultyManager";
import AlumniManager from "./user/Department/page/AlumniManager";
import FacultyForgotPassword from "./user/Faculty/components/FacultyForgotPassword";
import StudentNotification from "./user/Student/components/StudentNotification";
import FacultyProfile from "./user/Faculty/pages/FacultyProfile";
import StudentProfile from "./user/Student/pages/StudentProfile";



import Student_AboutUni from "./user/Student/components/Student_AboutUni";
import Faculty_AboutUni from "./user/Faculty/components/Faculty_AboutUni";



function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<First />} />{" "}
        {/* 👈 updated default to landing page */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
       
        <Route path="/student" element={<Student />} />
        
        <Route path="/alumni" element={<Alumni />} />
       
        <Route path="/student-profile" element={<StudentProfile/>} />
        <Route path="/deleter" element={<Delete />} />
        
        <Route path="/faculty-profile" element={<FacultyProfile />} />

        <Route path="/home" element={<Home />} />
       
        <Route path="/faculty-signup" element={<FacultySignup />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/faculty-forgot-password" element={<FacultyForgotPassword />} />
        {/* <Route path="/admin-signup" element={<AdminSignup />} /> */}
       
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
       
       
        <Route path="/facultydashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/delete/:facultyId" element={<Delete />} />


        <Route path="/student-adaniuni" element={<Student_AboutUni/>}/>
        <Route path="/faculty-adaniuni" element={<Faculty_AboutUni/>}/>

        <Route path="/change-password" element={<ChangePassword />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
     
     
        <Route path="/department-login" element={<DepartmentLogin/>} />
        <Route path="/department-dashboard" element={<DepartmentDashboard/>} />
        
        <Route path="/students-manager" element={<StudentAlumniManager />} />
        <Route path="/faculty-manager" element={<FacultyManager />} />
        <Route path="/alumni-manager" element={<AlumniManager />} />

        <Route path="/student-notifications" element={<StudentNotification />} />

      </Routes>
    </>
  );
}

export default App;
