

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FacultySignup = () => {
  const navigate = useNavigate();

  // --- step/state setup
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");                   // holds typed User ID
  const [generatedPassword, setGeneratedPassword] = useState(""); // holds typed Password

 
  const [formData, setFormData] = useState({
    name: "",
   email: "",
  department: "",
  phone: "",
  designation: "",
  facultyID: ""
  });

  const [loading, setLoading] = useState(false);

  // Helper to update the two final inputs
  const getValue = (e) => {
    const { name, value } = e.target;
    if (name === "userId") setUserId(value);
    if (name === "generatedPassword") setGeneratedPassword(value);
  };

  // --- Step 1: Verify Email
  const handleEmailVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/verify-faculty/email",
        { email }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      // store name + email for backend registration
      setFormData((prev) => ({
        ...prev,
        email,
        name: res.data.name,
      }));

      setStep(2);
    } catch (err) {
      console.error("❌ Faculty Email Verification Error:", err);
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Verify OTP & pull back credentials
  const handleOtpVerify = async () => {
    setLoading(true);
    try {
      // verify OTP
      await axios.post(
        "http://localhost:5000/api/verify-faculty/otp",
        { email: formData.email, otp }
      );
      toast.success("OTP Verified ✅");

      // then request the generated credentials
      const credRes = await axios.post(
        "http://localhost:5000/api/verify-faculty/generate-credentials",
        { email: formData.email, otp }
      );

      console.log("🆔 Generated Credentials:", credRes.data);

      toast.success("Username and Password sent to your email ✉️");
       setStep(3);
    } catch (err) {
      console.error("❌ OTP Verification Error:", err);
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Final signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // basic presence check
    if (!userId || !generatedPassword) {
      toast.error("Please enter the credentials sent to your email.");
      return;
    }
  
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/faculty/register", {
        Name: formData.name,              // 👈 Capital 'N'
        Email: formData.email,             // 👈 Capital 'E'
        role: formData.role,
        userId,
        Password: generatedPassword,      // 👈 Capital 'P'
      });
      

      console.log("✅ Register API Response:", res.data);

      const facultyID = res.data.facultyID;
      console.log("\n✅ get from backend :",facultyID);



      toast.success("Successfully Registered 🎉");
      setTimeout(() => {
        navigate("/facultydashboard", {
          state: { role: formData.role, email: formData.email, facultyID: userId }
        });
        
      }, 2500);
    } catch (err) {
      console.error("❌ Register Error:", err);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-yellow-50">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Faculty Signup
        </h1>
        <form onSubmit={handleSignup} className="flex flex-col">
          {/* Step 1 */}
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter Faculty Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 p-2 rounded bg-gray-100"
                required
              />
              <button
                type="button"
                onClick={handleEmailVerify}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-4"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mb-3 p-2 rounded bg-gray-100"
                required
              />
              <button
                type="button"
                onClick={handleOtpVerify}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-4"
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <input
                type="text"
                name="userId"
                placeholder="Enter User ID (from email)"
                value={userId}
                onChange={getValue}
                className="mb-3 p-2 rounded bg-gray-100"
                required
              />
              <input
                type="password"
                name="generatedPassword"
                placeholder="Enter Password (from email)"
                value={generatedPassword}
                onChange={getValue}
                className="mb-4 p-2 rounded bg-gray-100"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default FacultySignup;
