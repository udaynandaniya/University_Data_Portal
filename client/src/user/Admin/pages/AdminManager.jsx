import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddEditDepartmentModal from "./AddEditDepartmentModal"; // Assume you have a modal for adding/editing departments
import Swal from "sweetalert2";

const AdminManager = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [oldDepartmentId, setOldDepartmentId] = useState(null);
  const location = useLocation();

  const departmentName = location.state?.departmentName;
  console.log("🏛️ Department Name (AdminManager):", departmentName);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      console.log("🌐 Requesting all departments");
      const response = await axios.get("http://localhost:5000/admin/get-departments");
      const departments = Array.isArray(response.data)
        ? response.data
        : response.data.departments || []; // safe fallback
      console.log("✅ Departments fetched:", departments);
      setDepartmentList(departments);
    } catch (error) {
      console.error("❌ Error fetching departments:", error);
      setDepartmentList([]); // fallback to empty array on error
    }
  };

  const handleAdd = () => {
    console.log("➕ Opening Add Department Modal");
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (department) => {
    console.log("✏️ Opening Edit Modal for department:", department);
    setEditData(department);
    
  setOldDepartmentId(department.DepartmentId); 
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    console.log("🗑️ Attempting to delete department with ID:", id);
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
          await axios.delete(`http://localhost:5000/admin/delete-department/${id}`);
          Swal.fire("Deleted!", "Department has been deleted from mongoDb.", "success");
          fetchDepartments();
        } catch (error) {
          console.error("❌ Error deleting department:", error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  const handlePermanentDelete = async (department) => {
    console.log("\nhandlePermanentDelete :")
    console.log("\n Received and sent department.. :", department)
  

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the department record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete permanently!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:5000/admin/permanent-delete-department`, {
            data: department
          });
          console.log("✅ Permanently deleted:", res.data);
          fetchDepartments();
          Swal.fire("Deleted!", "Department permanently removed.", "success");
        } catch (error) {
          console.error("❌ Error in permanent delete:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

//   const handleModalSave = async (id, departmentId) => {

//     console.log("\n handleModalSave :")
//     console.log("\n Received and sent departmentId :", departmentId)
//     console.log("\n Received and sent id :", id)
  
//     try {
//       if (editData) {
//         // const mongoRes = await axios.put(
//         //   `http://localhost:5000/admin/update-department/${editData._id}`,
//         //   editData
//         // );
//         const jsonRes = await axios.put(
//           `http://localhost:5000/admin/json-update-department/${editData.DepartmentId}`,
//           {
//             ...editData,
//             old_DepartmentId: departmentId,
//           }
//         );
//         console.log("✅ Update Success:", mongoRes.data, jsonRes.data);
//         alert("✅ Department updated successfully!");
//       }
//       setModalOpen(false);
//       fetchDepartments();
//     } catch (err) {
//       console.error("❌ Update failed:", err);
//       alert("❌ Failed to save changes.");
//     }
//   };

  return (
    <div className="min-h-screen bg-indigo-50 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-pink-700">
            Department Data
        </h1>
        <button
          onClick={handleAdd}
          className="bg-pink-600 text-white py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300"
        >
          ➕ Add Department
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full text-center">
          <thead className="bg-pink-100 text-pink-700">
            <tr>
              <th className="py-4">Department ID</th>
              <th className="py-4">Department Head</th>
              <th className="py-4">Department Name</th>
              <th className="py-4">Email</th>
              <th className="py-4">Update</th>
              <th className="py-4">Delete</th>
              <th className="py-4">Permanent Delete</th>
            </tr>
          </thead>
          <tbody>
            {departmentList.map((department) => (
              <tr key={department._id} className="hover:bg-pink-50 transition duration-300">
                <td className="py-4">{department.DepartmentId}</td>
                <td className="py-4">{department.Department_head}</td>
                <td className="py-4">{department.Name}</td>
                <td className="py-4">{department.Email}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleEdit(department)}
                    className="text-pink-600 hover:text-pink-900 text-xl"
                  >
                    ✏️
                  </button>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handleDelete(department._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    🗑️
                  </button>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handlePermanentDelete(department)}
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
        <AddEditDepartmentModal
          closeModal={() => {
            console.log("❌ Closing Modal");
            setModalOpen(false);
          }}
          fetchDepartments={fetchDepartments}
          editData={editData}
          oldDepartmentId={oldDepartmentId}
        />
      )}
    </div>
  );
};

export default AdminManager;
