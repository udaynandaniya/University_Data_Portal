import React, { useState } from "react";

const DownloadDataTab = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [studentSubType, setStudentSubType] = useState("student");

  const handleDownload = async (type, source) => {
    let endpoint = "";

    if (type === "student") {
      endpoint =
        source === "json"
          ? "http://localhost:5000/department/download-json/student"
          : studentSubType === "student"
          ? "http://localhost:5000/department/download-db/student"
          : "http://localhost:5000/department/download-db/alumni";
    } else if (type === "faculty") {
      endpoint =
        source === "json"
          ? "http://localhost:5000/department/download-json/faculty"
          : "http://localhost:5000/department/download-db/faculty";
    }

    try {
      const res = await fetch(endpoint);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${type}-${source}-${Date.now()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Download failed:", error);
      alert("Download failed.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">⬇️ Download Data</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("student")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "student"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Student Data
        </button>
        <button
          onClick={() => setActiveTab("faculty")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "faculty"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Faculty Data
        </button>
      </div>

      {/* JSON DOWNLOAD */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">📁 Download JSON File</h3>
        <button
          onClick={() => handleDownload(activeTab, "json")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Download  JSON
        </button>
      </div>

      {/* DB DOWNLOAD */}
      <div>
        <h3 className="font-semibold text-lg mb-2">📡 Download From Database</h3>

        {activeTab === "student" && (
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                value="student"
                checked={studentSubType === "student"}
                onChange={() => setStudentSubType("student")}
              />
              <span className="ml-1">Student</span>
            </label>
            <label className="ml-6">
              <input
                type="radio"
                value="alumni"
                checked={studentSubType === "alumni"}
                onChange={() => setStudentSubType("alumni")}
              />
              <span className="ml-1">Alumni</span>
            </label>
          </div>
        )}

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
