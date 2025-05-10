import React from "react";
import { useLocation } from "react-router-dom";
import FacultyNavbar from "./FacultyNavbar";

const FacultyDashboard = () => {
  const location = useLocation();
  const facultyId = location.state?.facultyID || localStorage.getItem("facultyId");

  console.log("\n 📍 FacultyDashboard → facultyID:", facultyId);

  return (
    <div className="min-h-screen bg-purple-50">
      <FacultyNavbar facultyId={facultyId} />

      <main className="pt-24 px-6 md:px-20">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">Welcome, Faculty!</h1>
        <p className="text-lg text-gray-700">
          This is your personalized dashboard to manage posts, interact with students, and stay informed.
        </p>
      </main>
    </div>
  );
};

export default FacultyDashboard;
