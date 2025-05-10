// // src/pages/Student.jsx
// // src/pages/Student.jsx
// import React from "react";
// import Navbar from "../components/Navbar";

// const Student = ({enrollment}) => {
//   return (
//     <>
//       <Navbar role="student" enrollment={enrollment}/>
//       <div className="flex justify-center items-center h-screen bg-gray-100 pt-20">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//           <h1 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h1>
//           <p className="text-center">Welcome to the Student Portal.</p>
//           {/* Add more student-specific content here */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Student;

// Student.jsx
// import React from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const Student = () => {
//   const location = useLocation();
//   const { enrollment, role } = location.state || {};

//   console.log("\nIn Student.jsx — Enrollment:", enrollment);
//   console.log("Role:", role);
//   return (
//     <>
//       <Navbar role="student" enrollment={enrollment}/>
//       <div className="flex justify-center items-center h-screen bg-gray-100 pt-20">
//         <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-lg transition-all duration-500">
//           <h1 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h1>
//           <p className="text-center">Welcome to the Student Portal.</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Student;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Student = () => {
  const location = useLocation();
  const { enrollment, role } = location.state || {};

  // Save to localStorage
  useEffect(() => {
    if (enrollment && role) {
      localStorage.setItem("currentEnrollment", enrollment);
      localStorage.setItem("currentRole", role);
    }
  }, [enrollment, role]);

  console.log("\nIn Student.jsx — Enrollment:", enrollment);
  console.log("Role:", role);

  return (
    <>
      <Navbar role="student" enrollment={enrollment} />
      <div className="flex justify-center items-center h-screen bg-gray-100 pt-20">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-lg transition-all duration-500">
          <h1 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h1>
          <p className="text-center">Welcome to the Student Portal.</p>
        </div>
      </div>
    </>
  );
};

export default Student;
