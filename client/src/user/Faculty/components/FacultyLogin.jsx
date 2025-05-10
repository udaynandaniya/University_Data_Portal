import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const FacultyLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "", // Email
    password: "",
  });

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    try {
      const loginRes = await axios.post("http://localhost:5000/api/faculty/login", {
        identifier,
        password,
      });
      const { token, role } = loginRes.data;
      localStorage.setItem("token", token);
      toast.success("Successfully logged in!");
      setTimeout(() => {
        navigate("/facultydashboard", { state: { role } });
      }, 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-blue-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-14 text-center">Faculty Sign In</h1>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
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
            to="/faculty-forgot-password"
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
          <a href="/faculty-signup" className="text-blue-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default FacultyLogin;
