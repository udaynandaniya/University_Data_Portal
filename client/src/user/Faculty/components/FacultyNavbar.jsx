// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import {
//   FaBell, FaComments, FaPen, FaUserCircle,
//   FaSignOutAlt, FaTrash, FaUniversity
// } from 'react-icons/fa';

// const FacultyNavbar = ({ facultyId }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Logout?',
//       text: 'Are you sure you want to logout?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8e44ad',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, logout!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate('/login');
//       }
//     });
//   };

//   const handleDeleteAccount = () => {
//     Swal.fire({
//       title: 'Delete Account?',
//       text: 'This will initiate account deletion.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#8e44ad',
//       confirmButtonText: 'Yes, proceed'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         // Navigate to delete page
//         navigate(`/faculty/delete/${facultyId}`);
//       }
//     });
//   };

//   return (
//     <nav className="bg-gradient-to-r from-purple-900 via-purple-700 to-purple-800 text-white shadow-lg py-4 px-6 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold flex items-center gap-3">
//           <img src="/logo.png" alt="Logo" className="w-9 h-9" />
//           Faculty Panel
//         </Link>

//         <div className="flex gap-6 text-lg font-medium items-center">
//           <Link to="/facultydashboard" className="hover:text-purple-200">Home</Link>
//           <Link to="/faculty/posts" className="flex items-center gap-1 hover:text-purple-200">
//             <FaPen /> Post
//           </Link>
//           <Link to="/faculty/chat" className="flex items-center gap-1 hover:text-purple-200">
//             <FaComments /> Chat
//           </Link>
//           <Link to="/faculty/notifications" className="flex items-center gap-1 hover:text-purple-200">
//             <FaBell /> Notifications
//           </Link>

//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center gap-1 hover:text-purple-200"
//             >
//               <FaUserCircle className="text-xl" /> Account
//             </button>
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-md">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="w-full px-4 py-2 flex items-center gap-2 hover:bg-red-100 border-b"
//                 >
//                   <FaTrash className="text-red-600" /> Delete Account
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-100"
//                 >
//                   <FaSignOutAlt /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default FacultyNavbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import universityLogo from "../../../assets/university.jpg";

// const FacultyNavbar = (facultyID) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [facultyID, setFacultyID] = useState();
//   const role = "faculty"; // fixed for faculty

//   console
//   const navigate = useNavigate();

//   console.log("\n✅ get from faculty dashboard  :",facultyID);


//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#8e44ad",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("facultyId");
//         navigate("/login");
//       }
//     });
//   };

//   const handleDeleteAccount = () => {
//     Swal.fire({
//       title: "Delete Account?",
//       text: "This will initiate account deletion.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#8e44ad",
//       confirmButtonText: "Yes, proceed",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate(`/faculty/delete/${facultyId}`);
//       }
//     });
//   };

//   return (
//     <nav className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 text-white py-4 px-6 shadow-md fixed w-full top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold flex items-center gap-3 hover:text-purple-300 transition">
//           <img src={universityLogo} alt="Adani University Logo" className="w-9 h-9 rounded-full" />
//           Adani University
//         </Link>

//         {/* Links */}
//         <div className="space-x-6 hidden md:flex text-lg font-medium items-center">
//           <Link to="/facultydashboard" className="hover:text-purple-300">
//             🏠 Home
//           </Link>

//           <Link to={`/faculty-profile?facultyId=${facultyID}&role=${role}`} className="hover:text-purple-300">
//             👤 Profile
//           </Link>

//           {/* <Link to="/signup" className="hover:text-purple-300">
//             📝 Register
//           </Link> */}

//           <Link to="/faculty-adaniuni" className="hover:text-purple-300">
//             🏛️ About Uni
//           </Link>

//           {/* Manage Account Dropdown */}
//           <div className="relative">
//             <button onClick={() => setDropdownOpen(!dropdownOpen)} className="hover:text-purple-300 flex items-center gap-1">
//               ⚙️ Manage Account
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
//                 <Link
//                   to={`/faculty/change-password?facultyId=${facultyID}`}
//                   className="block px-4 py-2 hover:bg-blue-100 border-b"
//                 >
//                   🔐 Change Password
//                 </Link>

//                 <button
//                   onClick={handleDeleteAccount}
//                   className="w-full px-4 py-2 hover:bg-red-100 border-b text-left"
//                 >
//                   🗑️ Delete Account
//                 </button>

//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 hover:bg-red-100 text-left"
//                 >
//                   🚪 Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default FacultyNavbar;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";

import universityLogo from "../../../assets/university.jpg";

const FacultyNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const role = "faculty";
  const navigate = useNavigate();

   const [searchParams] = useSearchParams();
   const facultyId = searchParams.get("facultyId");



  console.log("✅ FacultyNavbar → facultyID:", facultyId);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8e44ad",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("facultyId");
        navigate("/login");
      }
    });
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Delete Account?",
      text: "This will initiate account deletion.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#8e44ad",
      confirmButtonText: "Yes, proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/faculty/delete/${facultyId}`);
      }
    });
  };

  return (
    <nav className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 text-white py-4 px-6 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-3 hover:text-purple-300 transition">
          <img src={universityLogo} alt="Adani University Logo" className="w-9 h-9 rounded-full" />
          Adani University
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex text-lg font-medium items-center">
          <Link to="/facultydashboard" className="hover:text-purple-300">🏠 Home</Link>
          <Link to={`/faculty-profile?facultyId=${facultyId}`} className="hover:text-purple-300">👤 Profile</Link>
          <Link to="/faculty-adaniuni" className="hover:text-purple-300">🏛️ About Uni</Link>

          {/* Dropdown */}
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="hover:text-purple-300 flex items-center gap-1">
              ⚙️ Manage Account
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                <Link
                  to={`/faculty/change-password?facultyId=${facultyId}`}
                  className="block px-4 py-2 hover:bg-blue-100 border-b"
                >
                  🔐 Change Password
                </Link>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full px-4 py-2 hover:bg-red-100 border-b text-left"
                >
                  🗑️ Delete Account
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 hover:bg-red-100 text-left"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FacultyNavbar;
