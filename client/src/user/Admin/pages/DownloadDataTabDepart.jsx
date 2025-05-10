import React, { useState } from "react";

const DownloadDataTab = () => {
  const [activeTab, setActiveTab] = useState("department"); // Default tab set to "department"
  const [studentSubType, setStudentSubType] = useState("department");

  const handleDownload = async (type, source) => {
    let endpoint = "";

    
    if (type === "department") {
      endpoint =
        source === "json"
          ? "http://localhost:5000/admin/download-json/department" // Admin JSON download for department
          : "http://localhost:5000/admin/download-db/department"; // Admin DB download for department
    }

    try {
      const res = await fetch(endpoint);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${type}-${source}-${Date.now()}.json`; // File naming pattern
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Download failed:", error);
      alert("Download failed.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">⬇️ Download Department Data</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("department")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "department" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Department Data
        </button>
      </div>

      {/* JSON DOWNLOAD */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">📁 Download JSON File</h3>
        <button
          onClick={() => handleDownload(activeTab, "json")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Download JSON
        </button>
      </div>

      {/* DB DOWNLOAD */}
      <div>
        <h3 className="font-semibold text-lg mb-2">📡 Download From Database</h3>
        <button
          onClick={() => handleDownload(activeTab, "db")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Download From DB
        </button>
      </div>
    </div>
  );
};

export default DownloadDataTab;
