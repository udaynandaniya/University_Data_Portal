
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import FacultyManager from "./FacultyManager";
import StudentManager from "./StudentManager";
import AlumniManager from "./AlumniManager";
import UploadDataTab from "./UploadDataTab";
import DownloadDataTab from "./DownloadDataTab";
import NotificationTab from "./NotificationTab.jsx";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("faculty");
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
  

  const departmentName = location.state?.departmentName;

  useEffect(() => {
    if (!departmentName) {
      console.warn("⚠️ Department Name not found, redirecting to login...");
      navigate("/department-login");
    } else {
      console.log("🏢 Logged in Department:", departmentName);
    }
  }, [departmentName, navigate]);

  // useEffect(() => {
  //   const fetchUnreadCount = async () => {
  //     if (departmentName) {
  //       console.log("📥 Fetching unread notification count for:", departmentName);
  //       try {
  //         const res = await axios.get(`http://localhost:5000/notifications/unread/${departmentName}`);
  //         const unread = res.data.filter((n) => !n.isRead).length;
  //         setUnreadCount(unread);
  //         console.log("🔢 Unread notifications count:", unread);
  //       } catch (err) {
  //         console.error("❌ Error fetching notifications:", err);
  //       }
  //     }
  //   };
  
  //   fetchUnreadCount();
  // }, [departmentName]);
  
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (departmentName) {
    console.log("📥 Fetching unread notification count for:", departmentName);

        try {
          const res = await axios.get(`http://localhost:5000/updateRequests/countunread_deparment/${departmentName}`);
          // const unread = res.data.filter((n) => !n.isReadByDepart && n.status === "pending").length;
          console.log("\n unread notification from backedn :",res.data.count)
          setUnreadCount(res.data.count || 0);
        } catch (err) {
          console.error("❌ Error fetching unread notifications:", err);
        }
      }
    };
  
    fetchUnreadCount();
  }, [departmentName, activeTab]);
  
  const renderTabContent = () => {
    if (!departmentName) return <div>Loading...</div>;

    switch (activeTab) {
      case "faculty":
        return <FacultyManager departmentName={departmentName} />;
      case "students":
        return <StudentManager departmentName={departmentName} />;
      case "alumni":
        return <AlumniManager departmentName={departmentName} />;
      case "upload":
        return <UploadDataTab />;
      case "download":
        return <DownloadDataTab />;
      case "notifications":
        return <NotificationTab setUnreadCount={setUnreadCount} departmentName={departmentName}/>;
      default:
        return <FacultyManager departmentName={departmentName} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-700">
          {departmentName ? `${departmentName} Department Dashboard` : "Loading..."}
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 flex-wrap">
        {["faculty", "students", "alumni", "upload", "download", "notifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              console.log("🗂️ Switching to tab:", tab);
              setActiveTab(tab);
            }}
            className={`py-2 px-6 rounded-lg capitalize ${
              activeTab === tab
                ? "bg-pink-600 text-white"
                : "bg-white text-pink-600 border border-pink-600"
            } transition duration-300`}
          >
            {tab === "notifications" ? (
              <>
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 inline-block bg-red-500 text-white text-xs rounded-full px-2">
                    {unreadCount}
                  </span>
                )}
              </>
            ) : tab === "upload" ? "Upload Data" : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
