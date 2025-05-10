import React, { useState } from "react";

const UploadDataTab = () => {
  const [excelFile, setExcelFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setExcelFile(file);
    } else {
      alert("Please upload a valid Excel (.xlsx) file.");
      setExcelFile(null);
    }
  };

  const handleUpload = async () => {
    if (!excelFile) {
      alert("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    const apiUrl = "http://localhost:5000/admin/upload-department-excel";

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        alert(`✅ File uploaded and processed. ${result.added} records added.`);
        setExcelFile(null);
      } else {
        const error = await res.json();
        alert(`❌ Error: ${error.message}`);
      }
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">📁 Upload Department Data</h2>

      <div>
        <label className="block mb-2 text-sm font-medium">Upload Excel File (.xlsx)</label>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="mb-4 border border-gray-300 p-2 rounded w-full"
        />
        <button
          onClick={handleUpload}
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
        >
          Upload Excel
        </button>

        <div className="mt-6 opacity-60">
          <label className="block mb-2 text-sm font-medium">Upload PDF (Coming Soon)</label>
          <input
            type="file"
            disabled
            className="border border-gray-300 p-2 rounded w-full bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
    
  );
};

export default UploadDataTab;
