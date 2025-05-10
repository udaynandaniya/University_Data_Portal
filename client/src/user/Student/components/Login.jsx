

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "", // Email or Enrollment
    password: "",
  });

  const getValue = (e) => {
    const { name, value } = e.target;
    // console.log(`📥 Input Changed - ${name}: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    try {
      console.log("🚀 Logging in with:", formData);

      // Step 1: Resolve enrollment if identifier is email
      const isEmail = identifier.includes("@");
      let enrollment = identifier;

      if (isEmail) {
        console.log("\nwe are here")
        const res = await axios.post("http://localhost:5000/user/resolve-enrollment", {
          email: identifier,
        });

        enrollment = res.data.enrollment;

        if (!enrollment) {
          toast.error("No user found with that email.");
          return;
        }

        console.log("📌 Resolved Email to Enrollment:", enrollment);
      }

      // Step 2: Attempt login with enrollment + password
      const loginRes = await axios.post("http://localhost:5000/user/login", {
        identifier: enrollment,
        password,
      });

      const { role } = loginRes.data;
      console.log("✅ Login Success:", loginRes.data);

      toast.success("Successfully logged in!");

      setFormData({ identifier: "", password: "" });

      setTimeout(() => {
        navigate("/home", {
          state: {
            role,
            enrollment,
          },
        });
      }, 2500);
    } catch (err) {
      console.error("❌ Login Error:", err.response || err.message);
      if (err.response) {
        toast.error(`Login failed: ${err.response.data.message}`);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-blue-100">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-14 text-center">Sign In</h1>

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="text"
            placeholder="Email or Enrollment"
            name="identifier"
            value={formData.identifier}
            onChange={getValue}
            className="mb-3 p-2 rounded bg-gray-100"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={getValue}
            className="mb-3 p-2 rounded bg-gray-100"
            required
            autoComplete="off"
          />

          <Link
            to="/forgot-password"
            className="text-xs text-blue-700 text-right mb-4 block"
          >
            Forgot your password?
          </Link>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
