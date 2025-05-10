


import React, { useState } from "react";
import Swal from "sweetalert2";
import StudentLayout from "./StudentLayout";
import { useLocation } from 'react-router-dom';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [passwordMethod, setPasswordMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // const enrollment = localStorage.getItem("enrollment");
  // const role = localStorage.getItem("role");
  const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const enrollment = queryParams.get('enrollment');
  const role = queryParams.get('role');

  console.log("\n in ChangePassword and enrollment is  ",enrollment)
  console.log("\n in ChangePassword and role is  ",role)

  const isPasswordStrong = (password) => password.length >= 8;

  const sendOtp = async () => {
    try {
      setLoading(true);
      console.log("📤 Sending OTP request with enrollment:", enrollment);

      const response = await fetch("http://localhost:5000/Navbarstudent/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollment,role }),
      });

      const data = await response.json();
      console.log("📥 Received OTP send response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setOtpSent(true);
      Swal.fire("OTP Sent", "Check your registered email or phone for the OTP.", "success");
    } catch (error) {
      console.error("❌ OTP send error:", error);
      Swal.fire("Error", error.message || "Failed to send OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong(newPassword)) {
      return Swal.fire("Weak Password", "Password must be at least 8 characters long.", "warning");
    }

    setLoading(true);

    try {
      if (passwordMethod === "OTP") {
        console.log("📤 Verifying OTP with:", { enrollment, otp });

        const otpRes = await fetch("http://localhost:5000/Navbarstudent/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollment, otp }),
        });

        const otpData = await otpRes.json();
        console.log("📥 OTP verification response:", otpData);

        if (!otpRes.ok) {
          throw new Error(otpData.message || "OTP verification failed");
        }

        console.log("📤 Changing password after OTP:", { enrollment, newPassword });

        const changeRes = await fetch("http://localhost:5000/Navbarstudent/api/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollment, newPassword ,role}),
        });

        const changeData = await changeRes.json();
        console.log("📥 Password change response:", changeData);

        if (!changeRes.ok) {
          throw new Error(changeData.message || "Password change failed");
        }

        Swal.fire("Success", "Password changed successfully", "success");
        setOtp("");
        setNewPassword("");
        setOtpSent(false);

      } else if (passwordMethod === "OldPassword") {
        console.log("📤 Verifying old password:", { enrollment, currentPassword, newPassword });

        const verifyRes = await fetch("http://localhost:5000/Navbarstudent/api/verify-old-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollment, currentPassword , newPassword ,role}),
        });

        const verifyData = await verifyRes.json();
        console.log("📥 Old password verification response:", verifyData);

        if (!verifyRes.ok) {
          throw new Error(verifyData.message || "Old password verification failed");
        }

        console.log("📤 Changing password via old password:", { enrollment, newPassword });

        const changeRes = await fetch("http://localhost:5000/Navbarstudent/api/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollment, newPassword ,role }),
        });

        const changeData = await changeRes.json();
        console.log("📥 Password change response:", changeData);

        if (!changeRes.ok) {
          throw new Error(changeData.message || "Password change failed");
        }

        Swal.fire("Success", "Password changed successfully", "success");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <div className="mb-4">
          <button
            type="button"
            className={`w-full py-2 mb-2 rounded-md ${passwordMethod === "OTP" ? "bg-purple-700 text-white" : "bg-gray-300"}`}
            onClick={() => {
              setPasswordMethod("OTP");
              setOtpSent(false);
            }}
          >
            Change via OTP
          </button>
          <button
            type="button"
            className={`w-full py-2 rounded-md ${passwordMethod === "OldPassword" ? "bg-purple-700 text-white" : "bg-gray-300"}`}
            onClick={() => {
              setPasswordMethod("OldPassword");
            }}
          >
            Change via Old Password
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {passwordMethod === "OTP" && (
            <>
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2 border rounded-md"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </>
              )}
            </>
          )}

          {passwordMethod === "OldPassword" && (
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-2 border rounded-md"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 disabled:opacity-60"
            disabled={loading || (passwordMethod === "OTP" && !otpSent)}
          >
            {loading ? "Processing..." : "Change Password"}
          </button>
        </form>
      </div>
    </StudentLayout>
  );
};

export default ChangePassword;
