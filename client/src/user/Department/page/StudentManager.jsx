

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddEditStudentModal from "../components/AddEditStudentModal";
import Swal from "sweetalert2";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const location = useLocation();

  const departmentName = location.state?.departmentName;
  console.log("🏛️ Department Name (StudentManager):", departmentName);

  useEffect(() => {
    if (departmentName) {
      console.log("📦 useEffect triggered: Fetching Students for department:", departmentName);
      fetchStudents();
    }
  }, [departmentName]);

  const fetchStudents = async () => {
    try {
      console.log("🌐 Requesting Students for Department:", departmentName);
      const response = await axios.get(`http://localhost:5000/department/get-students`, {
        params: { departmentName }
      });
      console.log("✅ Students fetched successfully:", response.data);
      setStudents(response.data);
    } catch (error) {
      console.error("❌ Error fetching students:", error);
    }
  };

  const handleAdd = () => {
    console.log("➕ Opening Add Student Modal");
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (student) => {
    console.log("✏️ Opening Edit Modal for student:", student);

    const mappedStudent = {
      name: student.Name,
      rollNo: student.Enrollment,
      gender: student.Gender,
      program: student.Program,
      universitySeatNo: student.UniversitySeatNumber,
      whatsapp: student.Whatsapp,
      academicYear: student.AcademicYear,
      email: student.Email,
      phone: student.Phone || "",
      _id: student._id,
    };

    setEditData(mappedStudent);
    setModalOpen(true);
  };

  const handleStudentToAlumni = async () => {
    const { value: academicYear } = await Swal.fire({
      title: 'Enter the Academic Year of Students You Want to Transfer to Alumni',
      input: 'text',
      inputLabel: 'Academic Year',
      inputPlaceholder: 'e.g. 2023-24',
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter an academic year!';
        }
      }
    });
  
    if (academicYear) {
      const confirmResult = await Swal.fire({
        title: `Are you sure?`,
        text: `Do you want to transfer students of academic year "${academicYear}" to alumni?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, transfer them!',
      });
  
      if (confirmResult.isConfirmed) {
        try {
          const response = await axios.post(`http://localhost:5000/department/transfer-students-to-alumni`, {
            departmentName,
            academicYear,
          });
          console.log("✅ Transfer response:", response.data);
          Swal.fire('Transferred!', `Students of ${academicYear} have been moved to alumni.`, 'success');
          fetchStudents(); // Refresh student list
        } catch (error) {
          console.error("❌ Error during transfer:", error);
          Swal.fire('Error!', 'Something went wrong while transferring students.', 'error');
        }
      }
    }
  };
  

  const handleDelete = async (id) => {
    console.log("🗑️ Attempting to delete student with ID:", id);
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
          await axios.delete(`http://localhost:5000/department/delete-student/${id}`, {
            data: { departmentName }
          });
          console.log("✅ Student deleted successfully!");
          Swal.fire("Deleted!", "Student has been deleted.", "success");
          fetchStudents();
        } catch (error) {
          console.error("❌ Error deleting student:", error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      } else {
        console.log("❎ Delete cancelled by user.");
      }
    });
  };

  const handleModalSave = async () => {
    try {
      if (editData) {
        console.log("📤 Updating MongoDB using ID:", editData._id);
        const mongoResponse = await axios.put(
          `http://localhost:5000/department/update-student/${editData._id}`,
          editData
        );
        console.log("✅ MongoDB Response:", mongoResponse.data);

        console.log("📤 Updating JSON using enrollment number:", editData.rollNo);
        const jsonResponse = await axios.put(
          `http://localhost:5000/department/update-json/${editData.rollNo}`,
          editData
        );
        console.log("✅ JSON Response:", jsonResponse.data);

        alert("✅ Student updated successfully!");
      }

      setModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error("❌ Save Error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const handlePermanentDelete = async (id, studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone. The student will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:5000/department/permanent-delete-student/${id}`, {
            data: { Enrollment: studentId }
          });
          console.log("API response after permanent delete:", response);
          fetchStudents();
          Swal.fire('Deleted!', 'The student has been permanently deleted.', 'success');
        } catch (error) {
          console.error("❌ Permanent Delete Error:", error);
          Swal.fire('Error!', 'There was an error deleting the student.', 'error');
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-10">
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          {departmentName ? `${departmentName} Student Manager` : "Loading..."}
        </h1>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300"
        >
          ➕ Add Student
        </button>
      </div> */}
<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-indigo-700">
    {departmentName ? `${departmentName} Student Manager` : "Loading..."}
  </h1>
  <div className="flex gap-4">
    <button
      onClick={handleStudentToAlumni}
      className="bg-pink-600 text-white py-2 px-4 rounded-xl hover:bg-pink-700 transition duration-300"
    >
      🎓 Student_to_Alumni
    </button>
    <button
      onClick={handleAdd}
      className="bg-indigo-600 text-white py-2 px-6 rounded-xl hover:bg-indigo-700 transition duration-300"
    >
      ➕ Add Student
    </button>
  </div>
</div>

      {/* Student Table */}
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
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-green-50 transition duration-300">
                <td className="py-4">{student.Name}</td>
                <td className="py-4">{student.Enrollment}</td>
                <td className="py-4">{student.Gender}</td>
                <td className="py-4">{student.Program}</td>
                <td className="py-4">{student.UniversitySeatNumber}</td>
                <td className="py-4">{student.Whatsapp}</td>
                <td className="py-4">{student.AcademicYear}</td>
                <td className="py-4">{student.Email}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-indigo-600 hover:text-indigo-900 text-xl"
                  >
                    ✏️
                  </button>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    🗑️
                  </button>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handlePermanentDelete(student._id, student.Enrollment)}
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
        <AddEditStudentModal
          closeModal={() => setModalOpen(false)}
          fetchStudents={fetchStudents}
          editData={editData}
          departmentName={departmentName}
        />
      )}
    </div>
  );
};

export default StudentManager;
