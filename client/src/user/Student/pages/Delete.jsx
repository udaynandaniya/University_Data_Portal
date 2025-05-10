// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Swal from "sweetalert2";

// const Delete = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const enrollment = searchParams.get("enrollment");
//   const role = searchParams.get("role");

//   const handleVerifyAndDelete = async () => {
//     if (!otp || !enrollment || !role) {
//       return Swal.fire("Missing Info", "Please enter OTP and ensure all parameters are present.", "warning");
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/request/verify-otp-delete", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ otp, enrollment, role })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire("Deleted!", data.message || "Account deleted successfully.", "success").then(() => {
//           navigate("/login");
//         });
//       } else {
//         Swal.fire("Error", data.message || "Invalid OTP or deletion failed.", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Server error occurred.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex justify-center items-center">
//       <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold mb-4 text-purple-700">🔐 Verify OTP to Delete Account</h2>
//         <p className="text-gray-600 mb-6">Enter the OTP sent to your email to proceed with deleting your account.</p>

//         <input
//           type="text"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           placeholder="Enter OTP"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
//         />

//         <button
//           onClick={handleVerifyAndDelete}
//           disabled={loading}
//           className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
//         >
//           {loading ? "Verifying..." : "Delete Account"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Delete;









// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Swal from "sweetalert2";

// const Delete = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(300); // 5 minutes timer
//   const [resendEnabled, setResendEnabled] = useState(false);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const enrollment = searchParams.get("enrollment");
//   const role = searchParams.get("role");

//   // Start the timer when OTP is sent
//   useEffect(() => {
//     if (timer === 0) {
//       setResendEnabled(true);
//     }
//     const interval = setInterval(() => {
//       if (timer > 0) {
//         setTimer((prevTimer) => prevTimer - 1);
//       }
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [timer]);

//   const handleVerifyAndDelete = async () => {
//     if (!otp || !enrollment || !role) {
//       return Swal.fire("Missing Info", "Please enter OTP and ensure all parameters are present.", "warning");
//     }
  
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/request/verify-otp-delete", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ otp, enrollment, role }),
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         Swal.fire("Deleted!", data.message || "Account deleted successfully.", "success").then(() => {
//           navigate("/delete-success");
//         });
//       } else {
//         Swal.fire("Error", data.message || "Invalid OTP or deletion failed.", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Server error occurred.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleResendOtp = async () => {
//     if (!enrollment || !role) {
//       return Swal.fire("Missing Info", "Please ensure all parameters are present.", "warning");
//     }
  
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/request/send-otp-delete", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ enrollment, role }),
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         setTimer(300); // Reset the timer
//         setResendEnabled(false); // Disable resend button until timer expires
//         Swal.fire("OTP Sent!", "A new OTP has been sent to your email.", "success");
//       } else {
//         Swal.fire("Error", data.message || "Failed to send OTP.", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Server error occurred.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex justify-center items-center">
//       <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold mb-4 text-purple-700">🔐 Verify OTP to Delete Account</h2>
//         <p className="text-gray-600 mb-6">Enter the OTP sent to your email to proceed with deleting your account.</p>

//         <input
//           type="text"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           placeholder="Enter OTP"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
//         />

//         <button
//           onClick={handleVerifyAndDelete}
//           disabled={loading}
//           className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
//         >
//           {loading ? "Verifying..." : "Delete Account"}
//         </button>

//         {timer > 0 ? (
//           <p className="mt-4 text-gray-500">{`OTP expires in: ${Math.floor(timer / 60)}:${timer % 60}`}</p>
//         ) : (
//           <p className="mt-4 text-gray-500">OTP expired. Please request a new one.</p>
//         )}

//         {resendEnabled && (
//           <button
//             onClick={handleResendOtp}
//             disabled={loading} // Disable until the OTP is sent
//             className="mt-4 text-blue-600 hover:text-blue-800"
//           >
//             Resend OTP
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Delete;
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const Delete = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes timer
  const [resendEnabled, setResendEnabled] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const enrollment = searchParams.get("enrollment");
  const role = searchParams.get("role");

  // Start the timer when OTP is sent
  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
    }
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timer]);

  const handleVerifyAndDelete = async () => {
    if (!otp || !enrollment || !role) {
      return Swal.fire("Missing Info", "Please enter OTP and ensure all parameters are present.", "warning");
    }
  
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/request/verify-otp-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, enrollment, role }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        Swal.fire("Deleted!", data.message || "Account deleted successfully.", "success").then(() => {
          navigate("/delete-success");
        });
      } else {
        Swal.fire("Error", data.message || "Invalid OTP or deletion failed.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };
  

  const handleResendOtp = async () => {
    if (!enrollment || !role) {
      return Swal.fire("Missing Info", "Please ensure all parameters are present.", "warning");
    }
  
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/request/send-otp-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollment, role }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setTimer(300); // Reset the timer
        setResendEnabled(false); // Disable resend button until timer expires
        Swal.fire("OTP Sent!", "A new OTP has been sent to your email.", "success");
      } else {
        Swal.fire("Error", data.message || "Failed to send OTP.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex justify-center items-center">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-xl shadow-lg w-full max-w-md text-center transition-all duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-2xl font-extrabold mb-4 text-purple-200 drop-shadow-xl">🔐 Verify OTP to Delete Account</h2>
        <p className="text-gray-200 mb-6">Enter the OTP sent to your email to proceed with deleting your account.</p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 bg-white/40 backdrop-blur-sm"
        />

        <button
          onClick={handleVerifyAndDelete}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          {loading ? "Verifying..." : "Delete Account"}
        </button>

        {timer > 0 ? (
          <p className="mt-4 text-gray-300">{`OTP expires in: ${Math.floor(timer / 60)}:${timer % 60}`}</p>
        ) : (
          <p className="mt-4 text-gray-300">OTP expired. Please request a new one.</p>
        )}

        {resendEnabled && (
          <button
            onClick={handleResendOtp}
            disabled={loading} // Disable until the OTP is sent
            className="mt-4 text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default Delete;
