// import { useState, useEffect } from "react";
// import axios from "axios";

// const AddEditModal = ({ closeModal, fetchStudents, editData }) => {
//   const [formData, setFormData] = useState(
//     editData || {
//       name: "",
//       rollNo: "",
//       gender: "",
//       program: "",
//       universitySeatNo: "",
//       whatsapp: "",
//       academicYear: "",
//       email: "",
//       phone: "",
//     }
//   );

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
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
//         Phone: formData.phone, // if you have this field in database
//       };
  
//       if (editData) {
//         await axios.put(
//           `http://localhost:5000/department/update-student/${editData._id}`,
//           payload
//         );
//         console.log("✅ Student updated successfully");
//       } else {
//         await axios.post("http://localhost:5000/department/add-student", payload);
//         console.log("✅ Student added successfully");
//       }
  
//       fetchStudents();
//       closeModal();
//     } catch (error) {
//       console.error("❌ Error saving student:", error);
//     }
//   };
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-2xl w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
//           {editData ? "Edit Student" : "Add Student"}
//         </h2>

//         {/* Name Input */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           required
//         />

//         {/* Roll No. Input */}
//         <input
//           type="text"
//           name="rollNo"
//           placeholder="Roll No."
//           value={formData.rollNo}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           required
//         />

//         {/* Gender Input */}
//         <input
//           type="text"
//           name="gender"
//           placeholder="Gender"
//           value={formData.gender}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />

//         {/* Program Input */}
//         <input
//           type="text"
//           name="program"
//           placeholder="Program"
//           value={formData.program}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />

//         {/* University Seat No. Input */}
//         <input
//           type="text"
//           name="universitySeatNo"
//           placeholder="University Seat No."
//           value={formData.universitySeatNo}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />

//         {/* Whatsapp Input */}
//         <input
//           type="text"
//           name="whatsapp"
//           placeholder="Whatsapp"
//           value={formData.whatsapp}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />

//         {/* Academic Year Input */}
//         <input
//           type="text"
//           name="academicYear"
//           placeholder="Academic Year"
//           value={formData.academicYear}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />

//         {/* Email Input */}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           required
//         />

       

//         {/* Submit and Cancel Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             className="bg-indigo-600 text-white w-full py-2 rounded-xl hover:bg-indigo-700 transition duration-300"
//           >
//             {editData ? "Update" : "Add"}
//           </button>
//           <button
//             type="button"
//             onClick={closeModal}
//             className="bg-gray-400 text-white w-full py-2 rounded-xl hover:bg-gray-500 transition duration-300"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddEditModal;
