

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const NotificationTab = ({ setUnreadCount }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const departmentName = location.state?.departmentName;

//   useEffect(() => {
//     const fetchAndMarkNotifications = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await axios.get(`http://localhost:5000/notifications/${departmentName}`);
//         setNotifications(res.data);

//         await axios.put(`http://localhost:5000/notifications/mark-read/${departmentName}`);
//         setUnreadCount(0);
//       } catch (err) {
//         console.error("❌ Failed to fetch or mark notifications as read:", err);
//         setError("Failed to load notifications. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (departmentName) {
//       fetchAndMarkNotifications();
//     }
//   }, [departmentName, setUnreadCount]);

//   const handleDecision = async (notificationId, newStatus) => {
//     try {
//       console.log("\nUpdate status")
//       console.log("\\n for  notificationId :",notificationId)

//       await axios.put(`http://localhost:5000/updateRequests/update-request/${notificationId}`, {
//         status: newStatus,
//       });

//       // Delete notification
//       await axios.delete(`http://localhost:5000/updateRequests/delete/${notificationId}`);

//       // Update UI
//       setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
//     } catch (err) {
//       console.error("❌ Failed to process decision:", err);
//       setError("Action failed. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-6">
//         <div className="animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full" role="status"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-yellow-50 p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4 text-yellow-800">📢 Department Notifications</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       {notifications.length === 0 ? (
//         <p className="text-gray-500">No notifications yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {notifications.map((n) => {
//             const isExpanded = expandedId === n._id;

//             return (
//               <li key={n._id} className="p-4 bg-white rounded-lg shadow">
//                 <div
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() => setExpandedId(isExpanded ? null : n._id)}
//                 >
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       <strong>{n.userType}</strong> ({n.userId})
//                     </p>
//                     <p className="text-lg font-semibold">{n.oldName || "No Name"}</p>
//                   </div>
//                   <span className="text-xs text-indigo-500">
//                     {isExpanded ? "▲ Hide Details" : "▼ View Details"}
//                   </span>
//                 </div>

//                 {isExpanded && (
//                   <div className="mt-4 text-sm text-gray-800 space-y-2">
//                     {["Name", "Enrollment", "UniversitySeatNumber", "Program", "Email", "Gender", "Whatsapp"].map((field) =>
//                       n.requestData?.[field] ? (
//                         <p key={field}>
//                           <strong>{field}:</strong> {n.requestData[field]}
//                         </p>
//                       ) : null
//                     )}

//                     <p className="text-xs text-gray-400">
//                       {new Date(n.createdAt).toLocaleString()}
//                     </p>

//                     <div className="flex gap-4 mt-3">
//                       <button
//                         className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded"
//                         onClick={() => handleDecision(n._id, "approved")}
//                       >
//                         ✅ Approve
//                       </button>
//                       <button
//                         className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded"
//                         onClick={() => handleDecision(n._id, "rejected")}
//                       >
//                         ❌ Reject
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationTab;


import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const NotificationTab = ({ setUnreadCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectionMessages, setRejectionMessages] = useState({});
  const location = useLocation();
  const departmentName = location.state?.departmentName;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/updateRequests/fetchpendingrequest/${departmentName}`);
        // const filtered = res.data.filter((n) => n.status === "pending" && !n.isReadByDepart);
        setNotifications(res.data);  // Correctly accessing the response data
        setUnreadCount(0);
      } catch (err) {
        console.error("❌ Failed to fetch notifications:", err);
        setError("Failed to load notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (departmentName) fetchNotifications();
  }, [departmentName, setUnreadCount]);

  const handleDecision = async (notificationId, newStatus) => {
    try {
      let payload = { status: newStatus };

      if (newStatus === "rejected") {
        const msg = rejectionMessages[notificationId]?.trim();
        if (msg) payload.message = msg;
      }

      await axios.put(`http://localhost:5000/updateRequests/update-request/${notificationId}`, payload);

      // Optional: keep or delete the request
      // await axios.delete(`http://localhost:5000/updateRequests/delete/${notificationId}`);

      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      console.error("❌ Failed to process decision:", err);
      setError("Action failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-yellow-800">📢 Department Notifications</h2>

      {error && <p className="text-red-500">{error}</p>}

      {notifications.length === 0 ? (
        <p className="text-gray-500">No new update requests.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => {
            const isExpanded = expandedId === n._id;
            console.log("Notification:", n);  // Check if all required fields are present


            return (
              <li key={n._id} className="p-4 bg-white rounded-lg shadow">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : n._id)}
                >
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>{n.userType}</strong> ({n.userId})
                    </p>
                    <p className="text-lg font-semibold">{n.oldName || "Unnamed User"}</p>
                  </div>
                  <span className="text-xs text-indigo-500">
                    {isExpanded ? "▲ Hide Details" : "▼ View Details"}
                  </span>
                </div>

                {isExpanded && (
                  <div className="mt-4 text-sm text-gray-800 space-y-2">
                    {["Name", "Enrollment", "UniversitySeatNumber", "Program", "Email", "Gender", "Whatsapp"].map(
                      (field) =>
                        n.requestData?.[field] && (
                          <p key={field}>
                            <strong>{field}:</strong> {n.requestData[field]}
                          </p>
                        )
                    )}

                    <p className="text-xs text-gray-400">
                      Submitted at: {new Date(n.createdAt).toLocaleString()}
                    </p>

                    {/** Rejection message box */}
                    <div className="mt-2">
                      <textarea
                        placeholder="Enter reason (if rejecting)..."
                        className="w-full p-2 text-sm border border-red-300 rounded"
                        rows={2}
                        value={rejectionMessages[n._id] || ""}
                        onChange={(e) =>
                          setRejectionMessages((prev) => ({
                            ...prev,
                            [n._id]: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="flex gap-4 mt-3">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded"
                        onClick={() => handleDecision(n._id, "approved")}
                      >
                        ✅ Approve
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded"
                        onClick={() => handleDecision(n._id, "rejected")}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificationTab;
