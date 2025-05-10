// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // const AddEditStudentModal = ({ closeModal, fetchStudents, editData }) => {
// //   const [formData, setFormData] = useState({
// //     sr: "",
// //     enrollment: "",
// //     name: "",
// //     gender: "",
// //     program: "",
// //     universitySeatNo: "",
// //     whatsapp: "",
// //     academicYear: "",
// //     email: "",
// //   });

// //   useEffect(() => {
// //     if (editData) {
// //       setFormData(editData);
// //     }
// //   }, [editData]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const payload = {
// //         SR: formData.sr,
// //         Enrollment: formData.enrollment,
// //         Name: formData.name,
// //         Gender: formData.gender,
// //         Program: formData.program,
// //         UniversitySeatNumber: formData.universitySeatNo,
// //         Whatsapp: formData.whatsapp,
// //         AcademicYear: formData.academicYear,
// //         Email: formData.email,
// //       };

// //       if (editData) {
// //         await axios.put(`http://localhost:5000/department/update-student/${editData._id}`, payload);
// //         console.log("✅ Student updated successfully");
// //       } else {
// //         await axios.post(`http://localhost:5000/department/add-student`, payload);
// //         console.log("✅ Student added successfully");
// //       }

// //       fetchStudents();
// //       closeModal();
// //     } catch (error) {
// //       console.error("❌ Error saving student:", error);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
// //       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
// //           {editData ? "Edit Student" : "Add Student"}
// //         </h2>

// //         <input type="text" name="sr" placeholder="SR" value={formData.sr} onChange={handleChange} required className="mb-4 p-3 w-full border rounded-xl" />
// //         <input type="text" name="enrollment" placeholder="Enrollment" value={formData.enrollment} onChange={handleChange} required className="mb-4 p-3 w-full border rounded-xl" />
// //         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="mb-4 p-3 w-full border rounded-xl" />
// //         <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} className="mb-4 p-3 w-full border rounded-xl" />
// //         <input type="text" name="program" placeholder="Program" value={formData.program} onChange={handleChange} className="mb-4 p-3 w-full border rounded-xl" />
// //         <input type="text" name="universitySeatNo" placeholder="University Seat No" value={formData.universitySeatNo} onChange={handleChange} className="mb-4 p-3 w-full border rounded-xl" />
// //         <input type="text" name="whatsapp" placeholder="Whatsapp" value={formData.whatsapp} onChange={handleChange} className="mb-4 p-3 w-full border rounded-xl" />
// //         <input type="text" name="academicYear" placeholder="Academic Year" value={formData.academicYear} onChange={handleChange} className="mb-4 p-3 w-full border rounded-xl" />
// //         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="mb-4 p-3 w-full border rounded-xl" />

// //         <div className="flex gap-4">
// //           <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded-xl hover:bg-indigo-700">
// //             {editData ? "Update" : "Add"}
// //           </button>
// //           <button type="button" onClick={closeModal} className="bg-gray-400 text-white w-full py-2 rounded-xl hover:bg-gray-500">
// //             Cancel
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddEditStudentModal;



// import { useState, useEffect } from "react";
// import axios from "axios";

// const AddEditStudentModal = ({ closeModal, fetchStudents, editData, departmentName }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     rollNo: "",
//     gender: "",
//     program: "",
//     universitySeatNo: "",
//     whatsapp: "",
//     academicYear: "",
//     email: "",
//     phone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         name: editData.name || "",
//         rollNo: editData.rollNo || "",
//         gender: editData.gender || "",
//         program: editData.program || "",
//         universitySeatNo: editData.universitySeatNo || "",
//         whatsapp: editData.whatsapp || "",
//         academicYear: editData.academicYear || "",
//         email: editData.email || "",
//         phone: editData.phone || "",
//       });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const payload = {
//         Name: formData.name,
//         Enrollment: formData.rollNo,
//         Gender: formData.gender,
//         Program: formData.program,
//         UniversitySeatNumber: formData.universitySeatNo,
//         Whatsapp: formData.whatsapp,
//         AcademicYear: formData.academicYear,
//         Email: formData.email,
//         Phone: formData.phone,
//         Department: departmentName,
//       };

//       let response;
//       if (editData && editData._id) {
//         response = await axios.put(
//           `http://localhost:5000/department/update-student/${editData._id}`,
//           payload
//         );
//         console.log("✅ Student updated:", response.data);
//       } else {
//         response = await axios.post(
//           `http://localhost:5000/department/add-student`,
//           payload
//         );
//         console.log("✅ Student added:", response.data);
//       }

//       fetchStudents();
//       closeModal();
//     } catch (error) {
//       console.error("❌ Error saving student:", error);
//       setError("Something went wrong while saving student. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
//           {editData ? "Edit Student" : "Add Student"}
//         </h2>

//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Name"
//           required
//           className="mb-4 p-3 w-full border rounded-xl"
//         />

//         <input
//           type="text"
//           name="rollNo"
//           value={formData.rollNo}
//           onChange={handleChange}
//           placeholder="Roll No (Enrollment)"
//           required
//           className="mb-4 p-3 w-full border rounded-xl"
//         />

//         <input
//           type="text"
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           placeholder="Gender"
//           required
//           className="mb-4 p-3 w-full border rounded-xl"
//         />

//         <input
//           type="text"
//           name="program"
//           value={formData.program}
//           onChange={handleChange}
//           placeholder="Program"
//           required
//           className="mb-4 p-3 w-full border rounded-xl"
//         />

//         <input
//           type="text"
//           name="universitySeatNo"
//           value={formData.universitySeatNo}
//           onChange={handleChange}
//           placeholder="University Seat No"
//           required
//           className="mb-4 p-3 w-full border rounded-xl"
//         />

//         <input
//           type="text"
//           name="whatsapp"
//           value={formData.whatsapp}
//           onChange={handleChange}
//           placeholder="Whatsapp Number"
//           required
//           className="mb-4 p-3 w-full border rounded-xl"
//         />

//         <input
//           type="text"
//           name="academicYear"
//           value={formData.academicYear}
//           onChange={handleChange}
//           placeholder="Academic Year"
//           required
//           className="mb-4 p-3 w-full border rounded-xl"
//         />

//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           className="mb-4 p-3 w-full border rounded-xl"
//         />

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-indigo-600 text-white w-full py-2 rounded-xl hover:bg-indigo-700"
//           >
//             {loading ? "Processing..." : editData ? "Update" : "Add"}
//           </button>
//           <button
//             type="button"
//             onClick={closeModal}
//             className="bg-gray-400 text-white w-full py-2 rounded-xl hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddEditStudentModal;


import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEditStudentModal = ({ closeModal, fetchStudents, editData, departmentName }) => {
  console.log("\nAddEditStudentModal..");

  const [formData, setFormData] = useState({
    SR: "",
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

  const handleSubmit = async (e) => {
    console.log("\n📨 Student form submitted");
    e.preventDefault();
    setLoading(true);
    setError(null);

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

    try {
      if (editData) {
        payload.SR = editData.SR;
        console.log("✏️ Editing student...");

        const mongoRes = await axios.put(
          `http://localhost:5000/department/mongoDB-update-student/${editData._id}`,
          payload
        );
        console.log("✅ MongoDB update response:", mongoRes.data);

        const jsonRes = await axios.put(
          `http://localhost:5000/department/json-update-student/${formData.rollNo}`,
          payload
        );
        console.log("✅ JSON update response:", jsonRes.data);

        toast.success("✅ Student updated successfully!");
      } else {
        console.log("➕ Adding new student...");

        const res = await axios.post(`http://localhost:5000/department/add-student`, payload);
        console.log("✅ Student added:", res.data);

        if (res.status === 201) {
          toast.success("✅ New student added successfully!");
        } else {
          toast.error("❌ Unexpected response from server.");
        }
      }

      fetchStudents();
      closeModal();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("❌ Student with this Enrollment or Email already exists.");
      } else {
        console.error("❌ Submission error:", err);
        toast.error("❌ Error while adding student. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          {editData ? "Edit Student" : "Add Student"}
        </h2>

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
          placeholder="Email e.g. student@example.com"
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

export default AddEditStudentModal;
