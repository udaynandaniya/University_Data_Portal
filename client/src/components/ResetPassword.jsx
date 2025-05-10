import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}
