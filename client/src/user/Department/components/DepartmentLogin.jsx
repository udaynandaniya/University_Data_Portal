// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DepartmentLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     // Ensure data is being correctly sent
//     console.log("Sending login data:", formData);
  
//     setLoading(true); // Disable the button while logging in

//     try {
//       const response = await axios.post('http://localhost:5000/department/login', formData);
//       console.log("Login response:", response.data); // Log the response from the server
//       toast.success(response.data.message);  // Show success message using react-toastify
      
//     console.log("\n hii i am here hii");
      
      
//       navigate('/department-dashboard');  // Redirect to a dashboard or appropriate route after successful login
//     } catch (error) {
//       console.error("Login error:", error);  // Log the full error
//       toast.error(error.response ? error.response.data.message : 'Something went wrong');
//     } finally {
//       setLoading(false);  // Re-enable the button after the process is done
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-96">
//         <h2 className="text-2xl mb-6 font-bold text-center text-indigo-700">Department Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Department Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="mb-6 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       {/* Toast notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default DepartmentLogin;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DepartmentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Sending login data:", formData);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/department/login', formData);
      console.log("Login response:", response.data);

      toast.success(response.data.message);

      const departmentName = response.data.departmentName; // 👈 Fetch department name from backend
       
      console.log("\n departmentName :", departmentName)

      // if (departmentName) {
      //   navigate(`/${departmentName}-depart-dashboard`); // 👈 Dynamic navigation
      // } else {
      //   console.error("Department Name not found in response");
      //   toast.error("Department Name missing in server response");
      // }

      if (departmentName) {
        navigate('/department-dashboard', { state: { departmentName } }); // Pass departmentName as route state
      } else {
        console.error("Department Name not found in response");
        toast.error("Department Name missing in server response");
      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response ? error.response.data.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl mb-6 font-bold text-center text-indigo-700">Department Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Department Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-6 p-3 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default DepartmentLogin;
