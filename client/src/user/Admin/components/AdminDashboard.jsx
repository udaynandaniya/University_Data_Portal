


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";  // Import SweetAlert2 for confirmation

// const TabButton = ({ active, onClick, children }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-4 py-2 rounded ${active ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
//     >
//       {children}
//     </button>
//   );
// };
// const StatsCard = ({ title, count, color }) => {
//   return (
//     <div className={`bg-${color}-100 p-4 rounded-lg shadow-md`}>
//       <h3 className="text-xl font-semibold">{title}</h3>
//       <p className="text-2xl font-bold">{count}</p>
//     </div>
//   );
// };

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("counts");
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalAlumni: 0,
//     totalFaculty: 0,
//     totalDepartment: 0,
//   });
//   const [departments, setDepartments] = useState([]);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentDepartment, setCurrentDepartment] = useState({
//     DepartmentId: "",
//     Name: "",
//     Email: "",
//     Password: "",
//     lastLoggedIn: "",
//     oldDepartmentId: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (activeTab === "counts") fetchCounts();
//     if (activeTab === "departments") fetchDepartments();
//   }, [activeTab]);

//   const fetchCounts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/admin/users");
//       if (res.data.success) {
//         setStats(res.data.stats);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching user data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDepartments = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/admin/departments");
//       setDepartments(res.data.departments);
//     } catch (error) {
//       console.error("❌ Error fetching departments:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this department?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/admin/departments/${id}`);
//       fetchDepartments();
//     } catch (error) {
//       console.error("❌ Delete Error:", error);
//     }
//   };

//   const handlePermanentDelete = (id, DepartmentId) => {
//     console.log("\nnow going to permenente delete account")
//     // Trigger SweetAlert2 confirmation dialog
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "This action cannot be undone. The department will be permanently deleted.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         // Log the department id and confirmation response
//         // console.log("Deleting department with ID for mongoDb :", id);
//         console.log("DepartmentId: for json", DepartmentId);
  
//         try {
//           // Call the backend API to permanently delete the department
//           // console.log("Making API request to delete department with ID:", id);
//           const response = await axios.delete(`http://localhost:5000/admin/departments/permanent/${id}`,{
//             data: { DepartmentId: DepartmentId } 
//           });
          
//           console.log("API response after delete:", response);
  
//           // Refresh the department list after successful delete
//           fetchDepartments(); // Refresh the department list
          
//           Swal.fire(
//             'Deleted!',
//             'The department has been permanently deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error("❌ Permanent Delete Error:", error);
  
//           // Show error message if deletion fails
//           Swal.fire(
//             'Error!',
//             'There was an error deleting the department.',
//             'error'
//           );
//         }
//       }
//     });
//   };
  
//   const openAddModal = () => {
//     setCurrentDepartment({
//       DepartmentId: "",
//       Name: "",
//       Email: "",
//       Password: "",
//       lastLoggedIn: "",
//     });
//     setEditMode(false);
//     setModalOpen(true);
//   };

//   const openEditModal = (department) => {
//     setCurrentDepartment({
//       _id: department._id,
//       DepartmentId: department.DepartmentId, // This is the new department ID (you will use this in the form)
//       Name: department.Name,
//       Email: department.Email,
//       Password: "", // Don't show the password field in edit mode
//       lastLoggedIn: department.lastLoggedIn,
//       oldDepartmentId: department.DepartmentId, // Capture the old department ID
//     });
//     setEditMode(true); // Set to edit mode
//     setModalOpen(true); // Open the modal
//   };

//   const handleModalSave = async () => {
//     try {
//       if (editMode) {
//         // Update department
//         console.log("\nnow go to update MongoDB data ");
//         console.log("\ncurrentDepartment._id is: ", currentDepartment._id);
//         console.log("\ncurrentDepartment is: ", currentDepartment);

//         // Send the updated data to MongoDB
//         const mongoResponse = await axios.put(`http://localhost:5000/admin/departments/mongodb/${currentDepartment._id}`, currentDepartment);
//         console.log("MongoDB Response:", mongoResponse.data);

//         // Send the updated data to the JSON file
//         const jsonResponse = await axios.put(`http://localhost:5000/admin/departments/json/${currentDepartment._id}`, currentDepartment);
//         console.log("JSON Response:", jsonResponse.data);
        
//         alert("✅ Department updated successfully!");
//       } else {
//         // Create new department
//         await axios.post(`http://localhost:5000/admin/departments`, currentDepartment);
//         alert("✅ Department added successfully!");
//       }
//       setModalOpen(false);
//       fetchDepartments();
//     } catch (error) {
//       console.error("❌ Save Error:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Admin Dashboard</h1>

//       {/* Tab Buttons */}
//       <div className="flex justify-center gap-4 mb-8">
//         <TabButton active={activeTab === "counts"} onClick={() => setActiveTab("counts")}>Counts</TabButton>
//         <TabButton active={activeTab === "departments"} onClick={() => setActiveTab("departments")}>Departments</TabButton>
//         <TabButton active={activeTab === "upload"} onClick={() => setActiveTab("upload")}>Upload</TabButton>
//       </div>

//       {/* Counts Tab */}
//       {activeTab === "counts" && (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <StatsCard title="Total Students" count={stats.totalStudents} color="blue" />
//               <StatsCard title="Total Alumni" count={stats.totalAlumni} color="purple" />
//               <StatsCard title="Total Faculty" count={stats.totalFaculty} color="red" />
//             </>
//           )}
//         </div>
//       )}

//       {/* Departments Tab */}
//       {activeTab === "departments" && (
//         <div>
//           <div className="flex justify-between mb-4">
//             <h2 className="text-2xl font-semibold">All Departments</h2>
//             <button onClick={openAddModal} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
//               ➕ Add Department
//             </button>
//           </div>
//           <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
//             <table className="table-auto w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border px-4 py-2">ID</th>
//                   <th className="border px-4 py-2">Name</th>
//                   <th className="border px-4 py-2">Email</th>
//                   <th className="border px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {departments.map((d) => (
//                   <tr key={d._id}>
//                     <td className="border px-4 py-2">{d.DepartmentId}</td>
//                     <td className="border px-4 py-2">{d.Name}</td>
//                     <td className="border px-4 py-2">{d.Email}</td>
//                     <td className="border px-4 py-2 flex gap-2">
//                       <button onClick={() => openEditModal(d)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
//                       <button onClick={() => handleDelete(d._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
//                       {/* Permanent Delete button */}
//                       <button onClick={() => handlePermanentDelete(d._id,d.DepartmentId)} className="bg-red-700 text-white px-3 py-1 rounded">Permanent Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Upload Tab */}
//       {activeTab === "upload" && (
//         <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border rounded px-4 py-2" />
//           <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded mt-4">Upload File</button>
//         </form>
//       )}

//       {/* Department Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl w-full max-w-lg">
//             <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Department" : "Add Department"}</h2>
//             <div className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 placeholder="Department ID"
//                 value={currentDepartment.DepartmentId}
//                 onChange={(e) => setCurrentDepartment({ ...currentDepartment, DepartmentId: e.target.value })}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={currentDepartment.Name}
//                 onChange={(e) => setCurrentDepartment({ ...currentDepartment, Name: e.target.value })}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={currentDepartment.Email}
//                 onChange={(e) => setCurrentDepartment({ ...currentDepartment, Email: e.target.value })}
//                 className="border p-2 rounded"
//               />
//               {!editMode && (
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={currentDepartment.Password}
//                   onChange={(e) => setCurrentDepartment({ ...currentDepartment, Password: e.target.value })}
//                   className="border p-2 rounded"
//                 />
//               )}
//               {editMode && (
//                 <input
//                   type="text"
//                   value={currentDepartment.lastLoggedIn}
//                   disabled
//                   className="border p-2 rounded bg-gray-100"
//                 />
//               )}
//               <div className="flex justify-end gap-4 mt-4">
//                 <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-400 rounded">Cancel</button>
//                 <button onClick={handleModalSave} className="px-4 py-2 bg-blue-600 text-white rounded">{editMode ? "Update" : "Create"}</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Department Manager Button */}
//       <div className="mt-8 text-right">
//         <button
//           className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
//           onClick={() => navigate("/department")}
//         >
//           Go to Department Manager
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import UploadDataTab from "../pages/UploadDataTabDepart";
// import DownloadDataTab from "../pages/DownloadDataTabDepart";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("counts");
//   const [stats, setStats] = useState({});
//   const [departments, setDepartments] = useState([]);
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (activeTab === "counts") fetchCounts();
//     if (activeTab === "departments") fetchDepartments();
//   }, [activeTab]);

//   const fetchCounts = async () => {
//     const res = await axios.get("http://localhost:5000/admin/users");
//     if (res.data.success) setStats(res.data.stats);
//   };

//   const fetchDepartments = async () => {
//     const res = await axios.get("http://localhost:5000/admin/departments");
//     setDepartments(res.data.departments);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post("http://localhost:5000/admin/upload", formData);
//       alert("File uploaded!");
//     } catch (error) {
//       alert("Upload failed.");
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "counts":
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <StatsCard title="Students" count={stats.totalStudents} />
//             <StatsCard title="Alumni" count={stats.totalAlumni} />
//             <StatsCard title="Faculty" count={stats.totalFaculty} />
//           </div>
//         );
//       case "departments":
//         return <DepartmentTable departments={departments} />;
//       case "upload":
//         return <UploadDataTab />;
//       case "download":
//         return <DownloadDataTab />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-pink-700">Admin Dashboard</h1>
//         <button
//           className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700"
//           onClick={() => navigate("/department")}
//         >
//           Go to Department Manager
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-8">
//         {["counts", "departments", "upload", "download"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`py-2 px-6 rounded-lg transition duration-300 ${
//               activeTab === tab
//                 ? "bg-pink-600 text-white"
//                 : "bg-white text-pink-600 border border-pink-600"
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {renderTabContent()}
//     </div>
//   );
// };

// const StatsCard = ({ title, count }) => (
//   <div className="bg-white p-6 rounded-xl shadow-md text-center">
//     <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
//     <p className="text-3xl font-bold text-pink-600">{count}</p>
//   </div>
// );

// const DepartmentTable = ({ departments }) => (
//   <div className="bg-white shadow rounded-xl overflow-x-auto">
//     <table className="min-w-full table-auto">
//       <thead className="bg-pink-100 text-pink-700">
//         <tr>
//           <th className="px-4 py-2 border">ID</th>
//           <th className="px-4 py-2 border">Name</th>
//           <th className="px-4 py-2 border">Email</th>
//         </tr>
//       </thead>
//       <tbody>
//         {departments.map((d) => (
//           <tr key={d._id} className="text-center">
//             <td className="px-4 py-2 border">{d.DepartmentId}</td>
//             <td className="px-4 py-2 border">{d.Name}</td>
//             <td className="px-4 py-2 border">{d.Email}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminManager from "../pages/AdminManager";
import UploadDataTab from "../pages/UploadDataTabDepart";
import DownloadDataTab from "../pages/DownloadDataTabDepart";
import AddEditDepartmentModal from "../pages/AddEditDepartmentModal";  // Import the AddEditDepartmentModal

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("admins");

  const renderTabContent = () => {
    switch (activeTab) {
      case "admins":
        return <AdminManager />;
      case "upload":
        return <UploadDataTab />;
      case "download":
        return <DownloadDataTab />;
      default:
        return <AdminManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 flex-wrap">
        {["admins", "upload", "download"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-6 rounded-lg capitalize ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-600"
            } transition duration-300`}
          >
            {tab === "upload" ? "Upload Data" : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default AdminDashboard;
