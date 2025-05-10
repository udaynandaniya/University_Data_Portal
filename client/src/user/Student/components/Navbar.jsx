

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import universityLogo from "../../../assets/university.jpg";

// const Navbar = ({ role: propRole, enrollment: propEnrollment }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [role, setRole] = useState(localStorage.getItem("role") || "");
//   const [enrollment, setEnrollment] = useState(localStorage.getItem("enrollment") || "");
//   const [unreadCount, setUnreadCount] = useState(0);

//   const navigate = useNavigate();

//   // Sync props with local state and localStorage
// useEffect(() => {
//   if (propRole) {
//     console.log("Setting role from props:", propRole);  // Log when role is updated
//     setRole(propRole);
//     // localStorage.setItem("role", propRole);
//   }

//   if (propEnrollment) {
//     console.log("Setting enrollment from props:", propEnrollment);  // Log when enrollment is updated
//     setEnrollment(propEnrollment);
//     // localStorage.setItem("enrollment", propEnrollment);
//   }
// }, [propRole, propEnrollment]);

// // Fetch unread notification count for Department users
// console.log("\n Fetch unread notification count for Department users");
// useEffect(() => {
//   const fetchStudentUnreadCount = async () => {
//     console.log("Role:", role);  // Log the current role
//     console.log("Enrollment:", enrollment);  // Log the current enrollment

//     if ( enrollment) {
//       try {
//         console.log("Fetching notifications for enrollment:", enrollment);  // Log before making the API call
//         const res = await axios.get(`http://localhost:5000/notifications/unread_by_student/${enrollment}`);

//         console.log("Received response from API:", res.data);  // Log the response data

//         // Assuming res.data is an array of notifications
//         setUnreadCount(res.data.length); // Correctly setting unread count based on the data length
//         console.log("Unread count:", res.data.length);  // Log the unread count
//       } catch (err) {
//         console.error("Error fetching student notifications:", err);
//       }
//     }
//   };

//   fetchStudentUnreadCount();
// }, [role, enrollment]);  // Dependency array ensures it runs when either role or enrollment changes

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
//         console.log("🚪 Logging out...");
//         localStorage.removeItem("role");
//         localStorage.removeItem("enrollment");
//         localStorage.removeItem("departmentName");
//         navigate("/login");
//       }
//     });
//   };

//   return (
//     <nav className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 text-white py-4 px-6 shadow-md fixed w-full top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl font-bold flex items-center gap-3 hover:text-purple-300 transition"
//         >
//           <img src={universityLogo} alt="Adani University Logo" className="w-9 h-9 rounded-full" />
//           Adani University
//         </Link>

//         {/* Nav Links */}
//         <div className="space-x-6 hidden md:flex text-lg font-medium items-center">
//           <Link to={`/${role.toLowerCase()}`} className="hover:text-purple-300">
//             🏠 Home
//           </Link>

//           <Link
//             to={`/student-profile?enrollment=${enrollment}&role=${role}`}
//             className="hover:text-purple-300"
//           >
//             👤 Profile
//           </Link>

        

//           <Link to="/student-adaniuni" className="hover:text-purple-300">
//             🏛️ About Uni
//           </Link>

         

// <Link
//   to={`/student-notifications?enrollment=${enrollment}&role=${role}`}
//   className="relative hover:text-purple-300 font-medium"
// >
//   🔔 Notifications
//   {unreadCount > 0 && (
//     <span className="ml-1 inline-block bg-red-500 text-white text-xs rounded-full px-2">
//       {unreadCount}
//     </span>
//   )}
// </Link>


//           {/* Account Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="hover:text-purple-300 flex items-center gap-1"
//             >
//               ⚙️ Manage Account
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
//                 <Link
//                   to={`/change-password?enrollment=${enrollment}&role=${role}`}
//                   className="block px-4 py-2 hover:bg-blue-100 border-b"
//                 >
//                   🔐 Change Password
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 hover:bg-red-100 border-b text-left"
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

// export default Navbar;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import universityLogo from "../../../assets/university.jpg";

// const Navbar = ({ role: propRole, enrollment: propEnrollment }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const [role, setRole] = useState(localStorage.getItem("role") || "");
//   const [enrollment, setEnrollment] = useState(localStorage.getItem("enrollment") || "");
//   const [unreadCount, setUnreadCount] = useState(0);

//   console.log("📌 Initial role from localStorage/state:", role);
//   console.log("📌 Initial enrollment from localStorage/state:", enrollment);

//   // Sync props with state + localStorage
//   useEffect(() => {
//     if (propRole) {
//       console.log("🔄 Syncing propRole to state/localStorage:", propRole);
//       setRole(propRole);
//       localStorage.setItem("role", propRole);
//     }
//     if (propEnrollment) {
//       console.log("🔄 Syncing propEnrollment to state/localStorage:", propEnrollment);
//       setEnrollment(propEnrollment);
//       localStorage.setItem("enrollment", propEnrollment);
//     }
//   }, [propRole, propEnrollment]);

//   // Fetch unread notifications
//   useEffect(() => {
//     const fetchUnread = async () => {
//       if (enrollment) {
//         console.log("📡 Fetching unread notifications for:", enrollment);
//         try {
//           const res = await axios.get(
//             `http://localhost:5000/notifications/unread_by_student/${enrollment}`
//           );
//           console.log("✅ Received unread notifications:", res.data);
//           console.log("✅ Received unread notifications length:", res.data.length);

//           setUnreadCount(res.data.length || 0);
//         } catch (err) {
//           console.error("❌ Error fetching notifications:", err);
//         }
//       } else {
//         console.warn("⚠️ Enrollment missing. Cannot fetch notifications.");
//       }
//     };
//     fetchUnread();
//   }, [enrollment]);

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
//         console.log("🚪 Logging out user:", { role, enrollment });
//         localStorage.removeItem("role");
//         localStorage.removeItem("enrollment");
//         localStorage.removeItem("departmentName");
//         navigate("/login");
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

//         {/* Nav Links */}
//         <div className="space-x-6 hidden md:flex text-lg font-medium items-center">
//           <Link to={`/${role.toLowerCase()}`} className="hover:text-purple-300">
//             🏠 Home
//           </Link>

//           <Link to={`/student-profile?enrollment=${enrollment}&role=${role}`} className="hover:text-purple-300">
//             👤 Profile
//           </Link>

//           <Link to="/student-adaniuni" className="hover:text-purple-300">
//             🏛️ About Uni
//           </Link>

//           <Link to={`/student-notifications?enrollment=${enrollment}&role=${role}`} className="relative hover:text-purple-300 font-medium">
//             🔔 Notifications
//             {unreadCount > 0 && (
//               <span className="ml-1 inline-block bg-red-500 text-white text-xs rounded-full px-2">
//                 {unreadCount}
//               </span>
//             )}
//           </Link>

//           {/* Account Dropdown */}
//           <div className="relative">
//             <button onClick={() => {
//               console.log("⚙️ Toggling dropdown. Current state:", dropdownOpen);
//               setDropdownOpen(!dropdownOpen);
//             }} className="hover:text-purple-300 flex items-center gap-1">
//               ⚙️ Manage Account
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
//                 <Link
//                   to={`/change-password?enrollment=${enrollment}&role=${role}`}
//                   className="block px-4 py-2 hover:bg-blue-100 border-b"
//                 >
//                   🔐 Change Password
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 hover:bg-red-100 border-b text-left"
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

// export default Navbar;




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import universityLogo from "../../../assets/university.jpg";

const Navbar = ({ role: propRole, enrollment: propEnrollment }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [enrollment, setEnrollment] = useState(localStorage.getItem("enrollment") || "");
  const [unreadCount, setUnreadCount] = useState(0);

  console.log("📌 Initial role from localStorage/state:", role);
  console.log("📌 Initial enrollment from localStorage/state:", enrollment);

  // Sync props with state + localStorage
  useEffect(() => {
    if (propRole) {
      console.log("🔄 Syncing propRole to state/localStorage:", propRole);
      setRole(propRole);
      localStorage.setItem("role", propRole);
    }
    if (propEnrollment) {
      console.log("🔄 Syncing propEnrollment to state/localStorage:", propEnrollment);
      setEnrollment(propEnrollment);
      localStorage.setItem("enrollment", propEnrollment);
    }
  }, [propRole, propEnrollment]);

  // Fetch unread notifications
  useEffect(() => {
    const fetchUnread = async () => {
      if (enrollment) {
        console.log("📡 Fetching unread notifications for:", enrollment);
        try {

           // 🟡 Reset if flag is set
        if (localStorage.getItem("notificationsViewed") === "true") {
          console.log("👁️ Notifications viewed — resetting unreadCount to 0");
          setUnreadCount(0);
          localStorage.removeItem("notificationsViewed"); // cleanup
          return;
        }
          const res = await axios.get(
            `http://localhost:5000/notifications/unread_by_student/${enrollment}`
          );
          console.log("✅ Received unread notifications:", res.data);
          console.log("✅ Received unread notifications length:", res.data.length);

          setUnreadCount(res.data.length || 0);
        } catch (err) {
          console.error("❌ Error fetching notifications:", err);
        }
      } else {
        console.warn("⚠️ Enrollment missing. Cannot fetch notifications.");
      }
    };
    fetchUnread();
  }, [enrollment]);

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
        console.log("🚪 Logging out user:", { role, enrollment });
        localStorage.removeItem("role");
        localStorage.removeItem("enrollment");
        localStorage.removeItem("departmentName");
        navigate("/login");
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

        {/* Nav Links */}
        <div className="space-x-6 hidden md:flex text-lg font-medium items-center">
          <Link to={`/${role.toLowerCase()}`} className="hover:text-purple-300">
            🏠 Home
          </Link>

          <Link to={`/student-profile?enrollment=${enrollment}&role=${role}`} className="hover:text-purple-300">
            👤 Profile
          </Link>

          <Link to="/student-adaniuni" className="hover:text-purple-300">
            🏛️ About Uni
          </Link>

          <Link to={`/student-notifications?enrollment=${enrollment}&role=${role}`} className="relative hover:text-purple-300 font-medium">
            🔔 Notifications
            {unreadCount > 0 && (
              <span className="ml-1 inline-block bg-red-500 text-white text-xs rounded-full px-2">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Account Dropdown */}
          <div className="relative">
            <button onClick={() => {
              console.log("⚙️ Toggling dropdown. Current state:", dropdownOpen);
              setDropdownOpen(!dropdownOpen);
            }} className="hover:text-purple-300 flex items-center gap-1">
              ⚙️ Manage Account
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                <Link
                  to={`/change-password?enrollment=${enrollment}&role=${role}`}
                  className="block px-4 py-2 hover:bg-blue-100 border-b"
                >
                  🔐 Change Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 hover:bg-red-100 border-b text-left"
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

export default Navbar;
