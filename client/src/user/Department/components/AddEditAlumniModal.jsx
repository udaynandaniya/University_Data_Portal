
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const AddEditAlumniModal = ({ closeModal, fetchStudents, editData, departmentName }) => {
  console.log("\nAddEditAlumniModal..")

  const [formData, setFormData] = useState({
    SR: "", // Add SR here for new alumni
    name: "",
    rollNo: "",
    gender: "",
    program: "",
    universitySeatNo: "",
    whatsapp: "",
    academicYear: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      // When editing, set the form data without the SR field
      setFormData({
        name: editData.name || "",
        rollNo: editData.rollNo || "",
        gender: editData.gender || "",
        program: editData.program || "",
        universitySeatNo: editData.universitySeatNo || "",
        whatsapp: editData.whatsapp || "",
        academicYear: editData.academicYear || "",
        email: editData.email || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  useEffect(() => {
    console.log("AddEditAlumniModal mounted");
  }, []);
  
  const handleSubmit = async (e) => {
    console.log("\n📨 Form submitted");
  
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Prepare the payload
      const payload = {
        SR: formData.SR,
        Enrollment: formData.rollNo,
        Name: formData.name,
        Gender: formData.gender,
        Program: formData.program,
        UniversitySeatNumber: formData.universitySeatNo,
        Whatsapp: formData.whatsapp,
        AcademicYear: formData.academicYear,
        Email: formData.email,
      };
  
      if (editData) {
        // Editing existing alumni
        payload.SR = editData.SR;
        console.log("\n✏️ Editing alumni...");
  
        const mongoResponse = await axios.put(
          `http://localhost:5000/department/mongoDB-update-alumni/${editData._id}`,
          payload
        );
        console.log("✅ MongoDB Update Response:", mongoResponse.data);
  
        const jsonResponse = await axios.put(
          `http://localhost:5000/department/json-update-alumni/${formData.rollNo}`,
          payload
        );
        console.log("✅ JSON File Update Response:", jsonResponse.data);
  
        toast.success("✅ Alumni updated successfully!");
      } else {
        // Adding new alumni
        console.log("\n➕ Adding new alumni...");
  
        try {
          const addResponse = await axios.post(
            `http://localhost:5000/department/add-alumni`,
            payload
          );
          console.log("✅ Alumni added to JSON:", addResponse.data);
  
          if (addResponse.status === 201) {
            toast.success("✅ New alumni added successfully!");
          } else {
            toast.error("❌ Unexpected response from server.");
          }
        } catch (err) {
          if (err.response && err.response.status === 409) {
            toast.error("❌ Alumni with this Enrollment or Email already exists.");
            return; // Exit early
          } else {
            throw err; // Rethrow other errors
          }
        }
      }
  
      fetchStudents(); // Refresh the list
      closeModal(); // Close the modal
    } catch (error) {
      console.error("❌ Submission Error:", error);
      toast.error("❌ Error while adding alumni. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          {editData ? "Edit Alumni" : "Add Alumni"}
        </h2>

        {/* Input fields */}
        {!editData && (
          <input
            type="text"
            name="SR"
            value={formData.SR}
            onChange={handleChange}
            placeholder="SR e.g. 14"
            required
            className="mb-4 p-3 w-full border rounded-xl"
          />
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name e.g. Patel Kirtankumar Mineshkumar"
          required
          className="mb-4 p-3 w-full border rounded-xl"
        />

        <input
          type="text"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          placeholder="Enrollment e.g. 220034"
          required
          className="mb-4 p-3 w-full border rounded-xl"
        />

        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Gender e.g. Male"
          required
          className="mb-4 p-3 w-full border rounded-xl"
        />

        <input
          type="text"
          name="program"
          value={formData.program}
          onChange={handleChange}
          placeholder="Program e.g. B.TECH-CIE"
          required
          className="mb-4 p-3 w-full border rounded-xl"
        />

        <input
          type="text"
          name="universitySeatNo"
          value={formData.universitySeatNo}
          onChange={handleChange}
          placeholder="University Seat No e.g. 1AUA22BCI009"
          required
          className="mb-4 p-3 w-full border rounded-xl"
        />

        <input
          type="text"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="Whatsapp No e.g. 8488852351"
          required
          className="mb-4 p-3 w-full border rounded-xl"
        />

        <input
          type="text"
          name="academicYear"
          value={formData.academicYear}
          onChange={handleChange}
          placeholder="Academic Year e.g. 2022-23"
          required
          className="mb-4 p-3 w-full border rounded-xl"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email e.g. kirtankumar.patel@adaniuni.ac.in"
          required
          className="mb-4 p-3 w-full border rounded-xl"
        />

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white w-full py-2 rounded-xl hover:bg-indigo-700"
          >
            {loading ? "Processing..." : editData ? "Update" : "Add"}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-400 text-white w-full py-2 rounded-xl hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditAlumniModal;
