

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import this
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify"; // you already imported toast, now import ToastContainer also

import "../index.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleSendOtp = async () => {
    try {
      console.log("\nhandleSendOtp..")
      console.log("\nemail..:",email)
      console.log("\nenrollment..:",enrollment)
      console.log("\nrole..:",role)
      // toast.success("hii i am uday");

      const res = await axios.post("http://localhost:5000/auth/forgot-password", {
        email,
        enrollment,
        role,
      });
      toast.success(res.data.message);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      // Pass both email and enrollment for the reset password
      const res = await axios.post("http://localhost:5000/auth/reset-password", {
        email,
        enrollment,  // Include enrollment here
        otp,
        newPassword,
      });

      toast.success(res.data.message);

      // ✅ Redirect to login after 1 sec
      setTimeout(() => {
        navigate("/login");  // Redirect to home (login page)
      }, 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-purple-200">
      
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        {!otpSent ? (
          <>
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded bg-gray-100"
            />

            <input
              type="text"
              placeholder="Enrollment No. (optional)"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              className="w-full mb-4 p-2 border rounded bg-gray-100"
            />

            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 p-2 border rounded bg-gray-100"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded bg-gray-100"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

