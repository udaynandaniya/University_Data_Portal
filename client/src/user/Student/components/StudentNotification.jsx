import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import StudentLayout from "./StudentLayout";

const StudentNotification = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve role and enrollment from query parameters
  const role = queryParams.get("role");
  const enrollment = queryParams.get("enrollment");

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Log received values
  console.log("📌 Role:", role);
  console.log("🎓 Enrollment:", enrollment);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("📬 Fetching notifications for:", enrollment);

        if (!enrollment) {
          console.warn("⚠️ No enrollment found — redirecting to login...");
          return;
        }

        setLoading(true);  // Start loading

        const res = await axios.get(`http://localhost:5000/notifications/student/student_fetching_notification_data/${enrollment}`);

        // Log the full API response
        console.log("📬 API Response:", res.data);

        setNotifications(res.data);
      } catch (err) {
        console.error("❌ Error loading notifications:", err);
      }
    };

    if (enrollment) {
      fetchNotifications();
    } else {
      console.warn("⚠️ No enrollment found — redirecting to login...");
      navigate("/login");
    }
  }, [enrollment, navigate]);

  const handleAcknowledge = async (id) => {
    try {
      console.log("✅ Acknowledging notification ID:", id);
      await axios.delete(`http://localhost:5000/notifications/delete/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("❌ Error deleting notification:", err);
    }
  };

  return (
    <StudentLayout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">📢 Notifications</h2>

        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((note) => (
              <div key={note._id} className="bg-white p-4 shadow rounded-md border">
                <p className="text-gray-700 mb-2">
                  <strong>Message:</strong> {note.message}
                </p>
                <button
                  onClick={() => handleAcknowledge(note._id)}
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  OK
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentNotification;
