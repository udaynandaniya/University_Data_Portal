// // src/pages/Alumni.jsx
// // src/pages/Alumni.jsx
// import React from "react";
// import Navbar from "./Navbar";

// const Alumni = ({enrollment}) => {
//   return (
//     <>
//       <Navbar role="alumni" enrollment={enrollment}/>
//       <div className="flex justify-center items-center h-screen bg-gray-100 pt-20">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//           <h1 className="text-2xl font-bold mb-4 text-center">Alumni Dashboard</h1>
//           <p className="text-center">Welcome to the Alumni Portal.</p>
//           {/* Add more alumni-specific content here */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Alumni;

// Alumni.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const Alumni = () => {
  const location = useLocation();
  const { enrollment, role } = location.state || {};

  console.log("\nIn alumni.jsx — Enrollment:", enrollment);
  console.log("Role:", role);

  return (
    <>
      <Navbar role="alumni" enrollment={enrollment}/>
      <div className="flex justify-center items-center h-screen bg-gray-100 pt-20">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-lg transition-all duration-500">
          <h1 className="text-2xl font-bold mb-4 text-center">Alumni Dashboard</h1>
          <p className="text-center">Welcome to the Alumni Portal.</p>
        </div>
      </div>
    </>
  );
};

export default Alumni;
