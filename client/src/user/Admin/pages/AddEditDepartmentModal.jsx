import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddEditDepartmentModal = ({ closeModal, fetchDepartments, editData ,oldDepartmentId }) => {

    console.log("\nedit tab open ")
    console.log("\n received  oldDepartmentId is :",oldDepartmentId)

  const [formData, setFormData] = useState({
    name: "",
    departmentId: "",
    departmentHead: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      console.log("\nYou are try to editing existing data..")
      setFormData({
        name: editData.Name || "",
        departmentId: editData.DepartmentId || "",
        departmentHead: editData.Department_head || "",
        email: editData.Email || "",
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
      DepartmentId: formData.departmentId,
      Department_head: formData.departmentHead,
      Email: formData.email,
      ...(formData.password && { Password: formData.password }), // ✅ only add password if it exists
    };

      if (editData) {
        try {
          // Update MongoDB
          await axios.put(
            `http://localhost:5000/admin/update-department/${editData._id}`,
            payload
          );
        
          // Update JSON file
          await axios.put(
            `http://localhost:5000/admin/json-update-department/${oldDepartmentId}`,
            payload
          );
        
          toast.success("✅ Department updated successfully!");
          setTimeout(() => {
            fetchDepartments();
  
              closeModal();
            }, 3200);
        } catch (error) {
          console.error("Update department error:", error);
          const errMsg = error.response?.data?.message || "❌ Failed to update department.";
          toast.error(errMsg);
        }finally {
          setLoading(false);
        }
         } else {
      //   // Add new department
     
     

      try {
        const response = await axios.post(`http://localhost:5000/admin/add-department`, payload);
      
        // Check response success
        if (response.data.success) {
          toast.success("✅ New department added successfully!");

        // Optional: send welcome email or notification
      //   try{
      //   console.log("\nsend welcome email or notification")
      //   await axios.post(`http://localhost:5000/admin/send-welcome-email`,payload);
      //   if (response.data.success) {
      //     toast.success("📧 Email Succesfully sended to New Deapartment");
        
      //   }
      // }catch(error){
      //     console.error("Send mail error :", error);
        
      //   // Show the error message from backend if available
      //   const errMsg = error.response?.data?.message || "❌ Failed to send.";
      //   toast.error(errMsg)

      //   }

          setTimeout(() => {
            fetchDepartments();
  
              closeModal();
            }, 3500);
        }
      } 
    catch (error) {
        console.error("Add department error:", error);
        
        // Show the error message from backend if available
        const errMsg = error.response?.data?.message || "❌ Failed to add department.";
        toast.error(errMsg);
      }finally {
        setLoading(false);
      }
       } 
     
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl p-8 rounded-3xl text-white transition-all duration-300"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-white drop-shadow-md">
          {editData ? "Edit Department" : "Add Department"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Department Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="text"
          name="departmentId"
          placeholder="Department ID"
          value={formData.departmentId}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="text"
          name="departmentHead"
          placeholder="Department Head"
          value={formData.departmentHead}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Department Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
                {!editData && (
        <input
            type="password"
            name="password"
            placeholder="Set Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-xl bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
        />
)}

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

export default AddEditDepartmentModal;
