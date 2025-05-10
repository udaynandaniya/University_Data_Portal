
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FacultyForgotPassword = () => {
  const [step, setStep] = useState(1);    // Step 1: Send OTP | Step 2: Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // --- Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
     const res = await axios.post("http://localhost:5000/faculty-auth/forgot-password", { email });

      if (res.data.success) {
        
         toast.success("OTP sent successfully! ");
        setStep(2);
      } else {
        console.log("\n hello")
        toast.error(res.data.message );

        toast.error("Failed to send OTP ");
      }
    } catch (err) {
      console.error("❌ Send OTP Error:", err);
      toast.error(err.response?.data?.message || "Failed to send OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Reset Password
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/faculty-auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successfully! 🎉");

        setTimeout(() => {
          navigate("/faculty-login");
        }, 2000);
      } else {
        toast.error(res.data.message || "Failed to reset password ❌");
      }
    } catch (err) {
      console.error("❌ Reset Password Error:", err);
      toast.error(err.response?.data?.message || "Failed to reset password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-blue-50">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Faculty Forgot Password
        </h1>

        <div className="flex flex-col space-y-4">
          {/* Step 1: Send OTP */}
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded bg-gray-100"
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded flex justify-center items-center"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {/* Step 2: Enter OTP and New Password */}
          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="p-3 rounded bg-gray-100"
                required
              />
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-3 rounded bg-gray-100"
                required
              />
              <button
                type="button"
                onClick={handleResetPassword}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded flex justify-center items-center"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyForgotPassword;
