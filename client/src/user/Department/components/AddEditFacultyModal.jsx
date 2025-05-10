
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";

// // const AddEditFacultyModal = ({ closeModal, fetchFaculties, editData }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     facultyId: "",
// //     department: "",
// //     email: "",
// //     verified: false,
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     if (editData) {
// //       setFormData({
// //         name: editData.Name || "",
// //         facultyId: editData.FacultyID || "",
// //         department: editData.Department || "",
// //         email: editData.Email || "",
// //         verified: editData.Verified || false,
// //       });
// //     }
// //   }, [editData]);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);

// //     const payload = {
// //       Name: formData.name,
// //       FacultyID: formData.facultyId,
// //       Department: formData.department,
// //       Email: formData.email,
// //       Verified: formData.verified,
// //     };

// //     try {
// //       if (editData) {
// //         await axios.put(
// //           `http://localhost:5000/department/update-faculty/${editData._id}`,
// //           payload
// //         );
// //         await axios.post(`http://localhost:5000/department/send-update-email`, {
// //           email: payload.Email,
// //           name: payload.Name,
// //           updatedData: payload,
// //         });
// //         toast.success("✅ Faculty updated successfully!");
// //       } else {
// //         const response = await axios.post(`http://localhost:5000/department/add-faculty`, payload);

// //         if (response.status === 201 || response.status === 200) {
// //           await axios.post(`http://localhost:5000/department/send-welcome-email`, {
// //             email: payload.Email,
// //             name: payload.Name,
// //             role: "Faculty",
// //           });
// //           toast.success("✅ New faculty added successfully!");
// //         } else {
// //           toast.error("❌ Unexpected server response.");
// //         }
// //       }

// //       fetchFaculties();
// //       closeModal();
// //     } catch (err) {
// //       console.error("❌ Error saving faculty:", err);
// //       if (err.response?.status === 409) {
// //         toast.error("❌ Faculty with this Email or ID already exists.");
// //       } else {
// //         toast.error("❌ Something went wrong. Please try again.");
// //       }
// //       setError(err.message || "Unknown error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-2xl shadow-2xl w-96"
// //       >
// //         <h2 className="text-2xl font-bold mb-6 text-center text-pink-700">
// //           {editData ? "Edit Faculty" : "Add Faculty"}
// //         </h2>

// //         <input
// //           type="text"
// //           name="name"
// //           placeholder="Name"
// //           value={formData.name}
// //           onChange={handleChange}
// //           className="mb-4 p-3 w-full border rounded-xl"
// //           required
// //         />

// //         <input
// //           type="text"
// //           name="facultyId"
// //           placeholder="Faculty ID"
// //           value={formData.facultyId}
// //           onChange={handleChange}
// //           className="mb-4 p-3 w-full border rounded-xl"
// //         />

// //         <input
// //           type="text"
// //           name="department"
// //           placeholder="Department"
// //           value={formData.department}
// //           onChange={handleChange}
// //           className="mb-4 p-3 w-full border rounded-xl"
// //           required
// //         />

// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={formData.email}
// //           onChange={handleChange}
// //           className="mb-4 p-3 w-full border rounded-xl"
// //           required
// //         />

// //         <div className="flex items-center mb-4">
// //           <input
// //             type="checkbox"
// //             name="verified"
// //             checked={formData.verified}
// //             onChange={handleChange}
// //             className="mr-2"
// //           />
// //           <label htmlFor="verified" className="text-pink-600">
// //             Verified Faculty
// //           </label>
// //         </div>

// //         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //         <div className="flex gap-4">
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="bg-pink-600 text-white w-full py-2 rounded-xl hover:bg-pink-700"
// //           >
// //             {loading ? "Processing..." : editData ? "Update" : "Add"}
// //           </button>
// //           <button
// //             type="button"
// //             onClick={closeModal}
// //             className="bg-gray-400 text-white w-full py-2 rounded-xl hover:bg-gray-500"
// //           >
// //             Cancel
// //           </button>
// //         </div>

// //         <ToastContainer position="top-center" />
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddEditFacultyModal;
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const AddEditFacultyModal = ({ closeModal, fetchFaculties, editData }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     facultyId: "",
//     department: "",
//     email: "",
//     verified: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         name: editData.Name || "",
//         facultyId: editData.FacultyID || "",
//         department: editData.Department || "",
//         email: editData.Email || "",
//         verified: editData.Verified || false,
//       });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError(null);

//   //   const payload = {
//   //     Name: formData.name,
//   //     FacultyID: formData.facultyId,
//   //     Department: formData.department,
//   //     Email: formData.email,
//   //     Verified: formData.verified,
//   //   };

//   //   try {
//   //     if (editData) {
//   //       // MongoDB Update
//   //       const mongoResponse = await axios.put(
//   //         `http://localhost:5000/department/mongoDB-update-faculty/${editData._id}`,
//   //         payload
//   //       );
//   //       console.log("✅ MongoDB update success:", mongoResponse.data);

//   //       // JSON Update (based on FacultyID)
//   //       const jsonResponse = await axios.put(
//   //         `http://localhost:5000/department/json-update-faculty/${formData.facultyId}`,
//   //         payload
//   //       );
//   //       console.log("✅ JSON update success:", jsonResponse.data);

//   //       // Send update email
//   //       await axios.post(`http://localhost:5000/department/send-update-email`, {
//   //         email: payload.Email,
//   //         name: payload.Name,
//   //         updatedData: payload,
//   //       });

//   //       toast.success("✅ Faculty updated successfully!");
//   //     } else {
//   //       // Adding new faculty
//   //       const response = await axios.post(
//   //         `http://localhost:5000/department/add-faculty`,
//   //         payload
//   //       );

//   //       if (response.status === 201 || response.status === 200) {
//   //         await axios.post(`http://localhost:5000/department/send-welcome-email`, {
//   //           email: payload.Email,
//   //           name: payload.Name,
//   //           role: "Faculty",
//   //         });
//   //         toast.success("✅ New faculty added successfully!");
//   //       } else {
//   //         toast.error("❌ Unexpected server response.");
//   //       }
//   //     }

//   //     fetchFaculties();
//   //     closeModal();
//   //   } catch (err) {
//   //     console.error("❌ Error saving faculty:", err);
//   //     if (err.response?.status === 409) {
//   //       toast.error("❌ Faculty with this Email or ID already exists.");
//   //     } else {
//   //       toast.error("❌ Something went wrong. Please try again.");
//   //     }
//   //     setError(err.message || "Unknown error");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
  
//     const mongoPayload = {
//       Name: formData.name,
//       FacultyID: formData.facultyId,
//       Department: formData.department,
//       Email: formData.email,
//       Verified: formData.verified,
//     };
  
//     const jsonPayload = {
//       Name: formData.name,
//       FacultyID: formData.facultyId,
//       Department: formData.department,
//       Email: formData.email,
//     };
  
//     try {
//       if (editData) {
//         // Update MongoDB
//         await axios.put(`http://localhost:5000/department/mongoDB-update-faculty/${editData._id}`, mongoPayload);
  
//         // Update JSON
//         await axios.put(`http://localhost:5000/department/json-update-faculty/${formData.facultyId}`, jsonPayload);
  
//         // Optional: send update email
//         await axios.post(`http://localhost:5000/department/send-update-email`, {
//           email: mongoPayload.Email,
//           name: mongoPayload.Name,
//           updatedData: mongoPayload,
//         });
  
//         toast.success("✅ Faculty updated successfully!");
//       } else {
//         // Add new to MongoDB
//         await axios.post(`http://localhost:5000/department/add-faculty`, mongoPayload);
  
//         // Optional: Welcome email
//         await axios.post(`http://localhost:5000/department/send-welcome-email`, {
//           email: mongoPayload.Email,
//           name: mongoPayload.Name,
//           role: "Faculty",
//         });
  
//         toast.success("✅ New faculty added successfully!");
//       }
  
//       fetchFaculties();
//       closeModal();
//     } catch (err) {
//       console.error("❌ Error saving faculty:", err);
//       if (err.response?.status === 409) {
//         toast.error("❌ Faculty with this Email or ID already exists.");
//       } else {
//         toast.error("❌ Something went wrong. Please try again.");
//       }
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-2xl w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-pink-700">
//           {editData ? "Edit Faculty" : "Add Faculty"}
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl"
//           required
//         />

//         <input
//           type="text"
//           name="facultyId"
//           placeholder="Faculty ID"
//           value={formData.facultyId}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl"
//           required
//         />

//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           value={formData.department}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl"
//           required
//         />

//         <div className="flex items-center mb-4">
//           <input
//             type="checkbox"
//             name="verified"
//             checked={formData.verified}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <label htmlFor="verified" className="text-pink-600">
//             Verified Faculty
//           </label>
//         </div>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-pink-600 text-white w-full py-2 rounded-xl hover:bg-pink-700"
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

//         <ToastContainer position="top-center" />
//       </form>
//     </div>
//   );
// };

// export default AddEditFacultyModal;

import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddEditFacultyModal = ({ closeModal, fetchFaculties, editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    facultyId: "",
    department: "",
    email: "",
    phone: "",
    designation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.Name || "",
        facultyId: editData.FacultyID || "",
        department: editData.Department || "",
        email: editData.Email || "",
        phone: editData.Phone || "",
        designation: editData.Designation || "",
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
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      Name: formData.name,
      FacultyID: formData.facultyId,
      Department: formData.department,
      Email: formData.email,
      Phone: formData.phone,
      Designation: formData.designation,
    };

    try {
      if (editData) {
        // Update MongoDB
        await axios.put(
          `http://localhost:5000/department/mongoDB-update-faculty/${editData._id}`,
          payload
        );

        // Update JSON
        await axios.put(
          `http://localhost:5000/department/json-update-faculty/${formData.facultyId}`,
          payload
        );

        // Optional: send update email
        await axios.post(`http://localhost:5000/department/send-update-email`, {
          email: payload.Email,
          name: payload.Name,
          updatedData: payload,
        });

        toast.success("✅ Faculty updated successfully!");
      } else {
        // Add new
        await axios.post(`http://localhost:5000/department/add-faculty`, payload);

        await axios.post(`http://localhost:5000/department/send-welcome-email`, {
          email: payload.Email,
          name: payload.Name,
          role: "Faculty",
        });

        toast.success("✅ New faculty added successfully!");
      }

      fetchFaculties();
      closeModal();
    } catch (err) {
      console.error("❌ Error saving faculty:", err);
      if (err.response?.status === 409) {
        toast.error("❌ Faculty with this Email or ID already exists.");
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl p-8 rounded-3xl text-white transition-all duration-300"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-white drop-shadow-md">
          {editData ? "Edit Faculty" : "Add Faculty"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="text"
          name="facultyId"
          placeholder="Faculty ID"
          value={formData.facultyId}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-700 transition duration-200 shadow-md"
          >
            {loading ? "Processing..." : editData ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-full py-2 rounded-xl bg-gray-500 hover:bg-gray-600 transition duration-200 shadow-md"
          >
            Cancel
          </button>
        </div>

        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default AddEditFacultyModal;
