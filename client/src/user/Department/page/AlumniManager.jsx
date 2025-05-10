

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 👈 To get departmentName from router
import axios from "axios";
import AddEditAlumniModal from "../components/AddEditAlumniModal"; 
import Swal from "sweetalert2";

const AlumniManager = () => {
  const [alumni, setAlumni] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const location = useLocation();

  const departmentName = location.state?.departmentName; // 👈 Capture departmentName
  console.log("🏛️ Department Name (AlumniManager):", departmentName);

  useEffect(() => {
    if (departmentName) {
      console.log("📦 useEffect triggered: Fetching Alumni for department:", departmentName);
      fetchAlumni();
    }
  }, [departmentName]);

  const fetchAlumni = async () => {
    try {
      console.log("🌐 Requesting Alumni for Department:", departmentName);
      const response = await axios.get(`http://localhost:5000/department/get-alumni`, {
        params: { departmentName } // 👈 Pass as query parameter
      });
      console.log("✅ Alumni fetched successfully:", response.data);
      setAlumni(response.data);
    } catch (error) {
      console.error("❌ Error fetching alumni:", error);
    }
  };

  const handleAdd = () => {
    console.log("➕ Opening Add Alumni Modal");
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (alumnus) => {
    console.log("✏️ Opening Edit Modal for alumnus:", alumnus);
  
    const mappedAlumnus = {
      name: alumnus.Name,
      rollNo: alumnus.Enrollment,
      gender: alumnus.Gender,
      program: alumnus.Program,
      universitySeatNo: alumnus.UniversitySeatNumber,
      whatsapp: alumnus.Whatsapp,
      academicYear: alumnus.AcademicYear,
      email: alumnus.Email,
      phone: alumnus.Phone || "",
      _id: alumnus._id,
    };
  
    setEditData(mappedAlumnus);
    setModalOpen(true);
  };
 
  const handleDelete = async (id) => {
    console.log("🗑️ Attempting to delete alumni with ID:", id);
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

        console.log("\nwe are passing departmentName : ",departmentName)
        console.log("\nwe are passing id : ",id)

        try {
          await axios.delete(`http://localhost:5000/department/delete-alumni/${id}`, {
            data: { departmentName } // 👈 Pass department name while deleting
          });
          console.log("✅ Alumnus deleted successfully!");
          Swal.fire("Deleted!", "Alumnus has been deleted.", "success");
          fetchAlumni();
        } catch (error) {
          console.error("❌ Error deleting alumnus:", error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      } else {
        console.log("❎ Delete cancelled by user.");
      }
    });
  };

console.log("📤 editData before PUT:", editData);


const handleModalSave = async () => {
  try {
    console.log("📤 editData in handleModalSave PUT:", editData);

    if (editData) {
      // === MongoDB Update ===
      console.log("\n🔄 Updating MongoDB using ID:", editData._id);
      const mongoResponse = await axios.put(
        `http://localhost:5000/department/update-alumni/${editData._id}`,
        editData
      );
      console.log("✅ MongoDB Response:", mongoResponse.data);

      // === JSON Update ===
      console.log("\n🔄 Updating JSON using enrollment number:", editData.rollNo);
      const jsonResponse = await axios.put(
        `http://localhost:5000/department/update-json/${editData.rollNo}`,
        editData
      );
      console.log("✅ JSON Response:", jsonResponse.data);

      alert("✅ Alumni updated successfully!");
    }

    // Close modal and refresh data
    setModalOpen(false);
    fetchAlumni(); // Refresh alumni list after update

  } catch (error) {
    console.error("❌ Save Error:", error);
    alert("❌ Something went wrong. Please try again.");
  }
};


const handlePermanentDelete = async (id, alumnusId) => {
    console.log("\nNow going to permanently delete alumnus");
    // Trigger SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone. The alumnus will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("\npermently deleting acccount")
          console.log("\n id :",id)
          console.log("\n alumnus Enrollment :",alumnusId)

          // Call the backend API to permanently delete the alumnus
          const response = await axios.delete(`http://localhost:5000/department/permanent-delete-alumni/${id}`,{
            data: { Enrollment : alumnusId } // Send ID for permanent deletion
          });
          
          console.log("API response after permanent delete:", response);
          fetchAlumni(); // Refresh the alumni list
          Swal.fire(
            'Deleted!',
            'The alumnus has been permanently deleted.',
            'success'
          );
        } catch (error) {
          console.error("❌ Permanent Delete Error:", error);
          Swal.fire(
            'Error!',
            'There was an error deleting the alumnus.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          {departmentName ? `${departmentName} Alumni Manager` : "Loading..."}
        </h1>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300"
        >
          ➕ Add Alumni
        </button>
      </div>

      {/* Alumni Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full text-center">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="py-4">Name</th>
              <th className="py-4">Enrollment</th>
              <th className="py-4">Gender</th>
              <th className="py-4">Program</th>
              <th className="py-4">University Seat No.</th>
              <th className="py-4">Whatsapp</th>
              <th className="py-4">Academic Year</th>
              <th className="py-4">Email</th>
              <th className="py-4">Update</th>
              <th className="py-4">Delete</th>
              <th className="py-4">Permanent Delete</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map((alumnus) => (
              <tr key={alumnus._id} className="hover:bg-green-50 transition duration-300">
                <td className="py-4">{alumnus.Name}</td>
                <td className="py-4">{alumnus.Enrollment}</td>
                <td className="py-4">{alumnus.Gender}</td>
                <td className="py-4">{alumnus.Program}</td>
                <td className="py-4">{alumnus.UniversitySeatNumber}</td>
                <td className="py-4">{alumnus.Whatsapp}</td>
                <td className="py-4">{alumnus.AcademicYear}</td>
                <td className="py-4">{alumnus.Email}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleEdit(alumnus)}
                    className="text-indigo-600 hover:text-indigo-900 text-xl"
                  >
                    ✏️
                  </button>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handleDelete(alumnus._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    🗑️
                  </button>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handlePermanentDelete(alumnus._id, alumnus.Enrollment)}
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

      {/* Add/Edit Alumni Modal */}
      {modalOpen && (
        <AddEditAlumniModal
          closeModal={() => {
            console.log("❌ Closing Modal");
            setModalOpen(false);
          }}
          fetchStudents={fetchAlumni}
          editData={editData}
          departmentName={departmentName} // 👈 Pass departmentName to modal as well
        />
      
      )}
    </div>
  );
};

export default AlumniManager;


