// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import AddEditFacultyModal from "../components/AddEditFacultyModal";
// // import Swal from "sweetalert2";

// // const FacultyManager = () => {
// //   const [facultyList, setFacultyList] = useState([]);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editData, setEditData] = useState(null);

// //   useEffect(() => {
// //     fetchFaculties();
// //   }, []);

// //   const fetchFaculties = async () => {
// //     try {
// //       console.log("🔍 Fetching faculty data from the server...");
// //       const response = await axios.get("http://localhost:5000/department/get-faculty");
// //       console.log("✅ Fetched Faculty:", response.data);
// //       setFacultyList(response.data);
// //     } catch (error) {
// //       console.error("❌ Error fetching faculty:", error);
// //     }
// //   };

// //   const handleAdd = () => {
// //     console.log("➕ Opening Add Faculty Modal");
// //     setEditData(null);
// //     setModalOpen(true);
// //   };

// //   const handleEdit = (faculty) => {
// //     console.log("✏️ Opening Edit Modal for faculty:", faculty);
  
// //     setEditData(faculty);  // pass faculty directly without mapping
// //     setModalOpen(true);
// //   };
  

// //   const handleDelete = async (id) => {
// //     console.log("🗑️ Attempting to delete faculty with ID:", id);
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "You won't be able to revert this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#d33",
// //       cancelButtonColor: "#3085d6",
// //       confirmButtonText: "Yes, delete it!",
// //     }).then(async (result) => {
// //       if (result.isConfirmed) {
// //         try {
// //           await axios.delete(`http://localhost:5000/department/delete-faculty/${id}`);
// //           console.log("✅ Faculty deleted successfully!");
// //           Swal.fire("Deleted!", "Faculty member has been deleted.", "success");
// //           fetchFaculties(); // Refresh the faculty list
// //         } catch (error) {
// //           console.error("❌ Error deleting faculty:", error);
// //           Swal.fire("Error!", "Something went wrong!", "error");
// //         }
// //       } else {
// //         console.log("❎ Delete cancelled by user.");
// //       }
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-indigo-50 p-10">
// //    {/* Header Section */}
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold text-indigo-700">Faculty Manager</h1>
// //         <button
// //           onClick={handleAdd}
// //           className="bg-indigo-600 text-white py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300"
// //         >
// //           ➕ Add Faculty
// //         </button>
// //       </div>

// //       {/* Table Section */}
// //       <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
// //         <table className="min-w-full text-center">
// //           <thead className="bg-indigo-100 text-indigo-700">
// //               <tr>
// //               <th className="py-4">Name</th>
// //               <th className="py-4">Faculty ID</th>
// //               <th className="py-4">Department</th>
// //               <th className="py-4">Email</th>
// //               <th className="py-4">Phone</th>
// //               <th className="py-4">Verified</th>
// //               <th className="py-4">Update</th>
// //               <th className="py-4">Delete</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {facultyList.map((faculty) => (
// //               <tr
// //                 key={faculty._id}
// //                 className="hover:bg-pink-50 transition duration-300"
// //               >
// //                 <td className="py-4">{faculty.Name}</td>
// //                 <td className="py-4">{faculty.FacultyID}</td>
// //                 <td className="py-4">{faculty.Department}</td>
// //                 <td className="py-4">{faculty.Email}</td>
// //                 <td className="py-4">{faculty.Phone}</td>
// //                 <td className="py-4">{faculty.Verified ? "Yes" : "No"}</td>
// //                 <td className="py-4">
// //                   <button
// //                     onClick={() => handleEdit(faculty)}
// //                     className="text-indigo-600 hover:text-indigo-900 text-xl"
// //                     >
// //                     ✏️
// //                   </button>
// //                 </td>
// //                 <td className="py-4">
// //                   <button
// //                     onClick={() => handleDelete(faculty._id)}
// //                     className="text-red-500 hover:text-red-700 text-xl"
// //                   >
// //                     🗑️
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Add/Edit Modal */}
// //       {modalOpen && (
// //         <AddEditFacultyModal
// //           closeModal={() => setModalOpen(false)}
// //           fetchFaculties={fetchFaculties}
// //           editData={editData}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default FacultyManager;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import AddEditFacultyModal from "../components/AddEditFacultyModal";
// import Swal from "sweetalert2";

// const FacultyManager = ({ departmentName }) => {
//   const [facultyList, setFacultyList] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   // Check if departmentName is passed and log it
//   useEffect(() => {
//     if (departmentName) {
//       console.log("📥 Department Name received in FacultyManager:", departmentName);
//       fetchFaculties(departmentName);
//     } else {
//       console.error("❌ Department Name is missing in FacultyManager!");
//     }
//   }, [departmentName]);

//   const fetchFaculties = async (departmentName) => {
//     try {
//       console.log("🔍 Fetching faculty data for department:", departmentName);
//       const response = await axios.get("http://localhost:5000/department/get-faculty", {
//         params: { departmentName } // Pass departmentName to the API
//       });
//       console.log("✅ Fetched Faculty:", response.data);
//       setFacultyList(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching faculty:", error);
//     }
//   };

//   const handleAdd = () => {
//     console.log("➕ Opening Add Faculty Modal");
//     setEditData(null);
//     setModalOpen(true);
//   };

//   const handleEdit = (faculty) => {
//     console.log("✏️ Opening Edit Modal for faculty:", faculty);
  
//     setEditData(faculty);  // pass faculty directly without mapping
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     console.log("🗑️ Attempting to delete faculty with ID:", id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`http://localhost:5000/department/delete-faculty/${id}`);
//           console.log("✅ Faculty deleted successfully!");
//           Swal.fire("Deleted!", "Faculty member has been deleted.", "success");
//           fetchFaculties(departmentName); // Refresh the faculty list
//         } catch (error) {
//           console.error("❌ Error deleting faculty:", error);
//           Swal.fire("Error!", "Something went wrong!", "error");
//         }
//       } else {
//         console.log("❎ Delete cancelled by user.");
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-indigo-50 p-10">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-indigo-700">Faculty Manager</h1>
//         <button
//           onClick={handleAdd}
//           className="bg-indigo-600 text-white py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300"
//         >
//           ➕ Add Faculty
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
//         <table className="min-w-full text-center">
//           <thead className="bg-indigo-100 text-indigo-700">
//             <tr>
//               <th className="py-4">Name</th>
//               <th className="py-4">Faculty ID</th>
//               <th className="py-4">Department</th>
//               <th className="py-4">Email</th>
//               <th className="py-4">Phone</th>
//               <th className="py-4">Verified</th>
//               <th className="py-4">Update</th>
//               <th className="py-4">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {facultyList.map((faculty) => (
//               <tr
//                 key={faculty._id}
//                 className="hover:bg-pink-50 transition duration-300"
//               >
//                 <td className="py-4">{faculty.Name}</td>
//                 <td className="py-4">{faculty.FacultyID}</td>
//                 <td className="py-4">{faculty.Department}</td>
//                 <td className="py-4">{faculty.Email}</td>
//                 <td className="py-4">{faculty.Phone}</td>
//                 <td className="py-4">{faculty.Verified ? "Yes" : "No"}</td>
//                 <td className="py-4">
//                   <button
//                     onClick={() => handleEdit(faculty)}
//                     className="text-indigo-600 hover:text-indigo-900 text-xl"
//                   >
//                     ✏️
//                   </button>
//                 </td>
//                 <td className="py-4">
//                   <button
//                     onClick={() => handleDelete(faculty._id)}
//                     className="text-red-500 hover:text-red-700 text-xl"
//                   >
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit Modal */}
//       {modalOpen && (
//         <AddEditFacultyModal
//           closeModal={() => setModalOpen(false)}
//           fetchFaculties={fetchFaculties}
//           editData={editData}
//         />
//       )}
//     </div>
//   );
// };

// export default FacultyManager;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddEditFacultyModal from "../components/AddEditFacultyModal";
import Swal from "sweetalert2";

const FacultyManager = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const location = useLocation();

  const departmentName = location.state?.departmentName;
  console.log("🏛️ Department Name (FacultyManager):", departmentName);

  useEffect(() => {
    if (departmentName) {
      console.log("📦 useEffect triggered: Fetching faculty for department:", departmentName);
      fetchFaculties();
    }
  }, [departmentName]);

  const fetchFaculties = async () => {
    try {
      console.log("🌐 Requesting Faculty for Department:", departmentName);
      const response = await axios.get("http://localhost:5000/department/get-faculty", {
        params: { departmentName },
      });
      console.log("✅ Faculty fetched:", response.data);
      setFacultyList(response.data);
    } catch (error) {
      console.error("❌ Error fetching faculty:", error);
    }
  };

  const handleAdd = () => {
    console.log("➕ Opening Add Faculty Modal");
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (faculty) => {
    console.log("✏️ Opening Edit Modal for faculty:", faculty);
    setEditData(faculty);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    console.log("🗑️ Attempting to delete faculty with ID:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/department/delete-faculty/${id}`, {
            data: { departmentName },
          });
          Swal.fire("Deleted!", "Faculty member has been deleted.", "success");
          fetchFaculties();
        } catch (error) {
          console.error("❌ Error deleting faculty:", error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  const handlePermanentDelete = async (id, facultyID,facultyEmail) => {
    console.log("\nhandlePermanentDelete :")
    
   console.log("\n Received and sended id : ",id)
console.log("\n Received and sended facultyID :",facultyID)
console.log("\n Received and sended facultyEmail :",facultyEmail)


    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the faculty record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete permanently!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:5000/department/permanent-delete-faculty/${id}`, {
            data: { FacultyID: facultyID, Email: facultyEmail,},
           
          });
          console.log("✅ Permanently deleted:", res.data);
          fetchFaculties();
          Swal.fire("Deleted!", "Faculty permanently removed.", "success");
        } catch (error) {
          console.error("❌ Error in permanent delete:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleModalSave = async () => {
    try {
      if (editData) {
        const mongoRes = await axios.put(
          `http://localhost:5000/department/mongoDB-update-faculty/${editData._id}`,
          editData
        );
        const jsonRes = await axios.put(
          `http://localhost:5000/department/json-update-faculty/${editData.FacultyID}`,
          editData
        );
        console.log("✅ Update Success:", mongoRes.data, jsonRes.data);
        alert("✅ Faculty updated successfully!");
      }
      setModalOpen(false);
      fetchFaculties();
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("❌ Failed to save changes.");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          {departmentName ? `${departmentName} Faculty Manager` : "Loading..."}
        </h1>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300"
        >
          ➕ Add Faculty
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full text-center">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="py-4">Name</th>
              <th className="py-4">Faculty ID</th>
              <th className="py-4">Department</th>
              <th className="py-4">Email</th>
              <th className="py-4">Phone</th>
              <th className="py-4">Update</th>
              <th className="py-4">Delete</th>
              <th className="py-4">Permanent Delete</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((faculty) => (
              <tr key={faculty._id} className="hover:bg-pink-50 transition duration-300">
                <td className="py-4">{faculty.Name}</td>
                <td className="py-4">{faculty.FacultyID}</td>
                <td className="py-4">{faculty.Department}</td>
                <td className="py-4">{faculty.Email}</td>
                <td className="py-4">{faculty.Phone}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleEdit(faculty)}
                    className="text-indigo-600 hover:text-indigo-900 text-xl"
                  >
                    ✏️
                  </button>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handleDelete(faculty._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    🗑️
                  </button>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handlePermanentDelete(faculty._id, faculty.FacultyID,faculty.Email)}
                    className="text-red-700 hover:text-red-900 text-xl"
                  >
                    🔒 Permanent Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AddEditFacultyModal
          closeModal={() => {
            console.log("❌ Closing Modal");
            setModalOpen(false);
          }}
          fetchFaculties={fetchFaculties}
          editData={editData}
          departmentName={departmentName}
          handleModalSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default FacultyManager;
