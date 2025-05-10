
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [enrollment, setEnrollment] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const getValue = (e) => {
    const { name, value } = e.target;
    if (name === "userId") setUserId(value);
    if (name === "generatedPassword") setGeneratedPassword(value);
  };

  // Step 1: Verify Enrollment Number
  const handleEnrollmentVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/verify-enrollment/verify", {
        enrollment,
      });

      console.log("✅ Enrollment API Response:", res.data);

      if (res.data.success === false) {
        toast.error(res.data.message || "User already registered. Please login.");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      toast.success(`Enrollment Verified ✅ You are a ${res.data.type}`);

      setFormData((prev) => ({
        ...prev,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      }));

      console.log("🧠 FormData after enrollment verify:", res.data);
      setStep(2);
    } catch (err) {
      console.error("❌ Enrollment Verification Error:", err);
      toast.error(err.response?.data?.message || "Enrollment verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Send Generated Credentials
  const handleOtpVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/verify-enrollment/otp", {
        email: formData.email,
        otp,
      });

      console.log("✅ OTP API Response:", res.data);

      toast.success("OTP Verified ✅");

      
      console.log("\n now request for credentials");

      // Simulate backend generating and emailing credentials
      const credRes = await axios.post("http://localhost:5000/verify-enrollment/generate-credentials", {
        email: formData.email,
        otp: formData.otp, // or whatever variable holds the OTP input
      });
      

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

  // Step 3: Final Signup using credentials
  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("📤 Submitting final credentials:", { userId, generatedPassword });

    if (!userId || !generatedPassword) {
      toast.error("Please enter Username and Password sent to your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/user/register", {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        userId,
        password: generatedPassword,
        enrollment,
      });

      console.log("✅ Register API Response:", res.data);

      toast.success("Successfully Registered 🎉");

      // setTimeout(() => {
      //   navigate("/home", {
      //     state: {
      //       role: res.data.role,
      //       enrollment: res.data.enrollment,
      //     },
      //   });
      // }, 2500);
    
      const userRole = res.data.user.Role;   // <-- this is important!
      console.log("🧭 Navigating based on role:", userRole);
      console.log("\nsend enrollment is :", enrollment);

  
      setTimeout(() => {
        if (userRole === "Student") {
          navigate("/student", { state: { role: userRole, enrollment } });
        } else if (userRole === "Alumni") {
          navigate("/alumni", { state: { role: userRole, enrollment } });
        } else {
          navigate("/home", { state: { role: userRole, enrollment } }); // fallback
        }
      }, 2500);
    
    
    
    } catch (err) {
      console.error("❌ Register API Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-blue-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
        <form onSubmit={handleSignup} className="flex flex-col">
          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Enter Enrollment Number"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                className="mb-3 p-2 rounded bg-gray-100"
                required
              />
              <button
                type="button"
                onClick={handleEnrollmentVerify}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-4"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Enrollment"}
              </button>
            </>
          )}

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
{step === 3 && (
  <>
    <input
      type="text"
      name="userId"
      value={userId}
      onChange={getValue}
      placeholder="Enter User ID (from email)"
      className="mb-3 p-2 rounded bg-gray-100"
      required
    />
    <input
      type="password"
      name="generatedPassword"
      value={generatedPassword}
      onChange={getValue}
      placeholder="Enter Password (from email)"
      className="mb-4 p-2 rounded bg-gray-100"
      required
    />
    <button
      type="submit"
      className="bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-4"
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

export default Signup;
