
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StudentLayout from "../components/StudentLayout";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const enrollment = searchParams.get("enrollment");
  const role = searchParams.get("role");

  const [tab, setTab] = useState("view");
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // To track the old Program value
  const [oldProgram, setOldProgram] = useState("");
  const [oldName, setOldName] = useState("");

  

  const fetchProfile = async () => {
    try {
      console.log("\nsend request for profile :")
      console.log("\nrole is :",role)
      console.log("\nsenrollment :",enrollment)

      const res = await fetch(`http://localhost:5000/profile/student/${role}/${enrollment}`);
      const data = await res.json();
  
      if (res.ok) {
        setFormData(data);
        setOldProgram(data.Program);
        setOldName(data.Name);
      } else {
        console.error("❌ Error fetching profile:", data.message);
      }
    } catch (error) {
      console.error("🔥 Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (enrollment && role) fetchProfile();
  }, [enrollment, role]);
  
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      // Check if Program has changed
      const programChanged = formData.Program !== oldProgram;

      console.log("\n sending data for updation :")
      console.log("\nrole:", role);
      console.log("\nuserId (enrollment):", enrollment);
      console.log("\nNew Program:", formData.Program);
      console.log("\nOld Program:", oldProgram);
      console.log("\nOld Name:", oldName);

      console.log("\nRequest Data:", formData);
      
      const res = await fetch("http://localhost:5000/updateRequests/studentalumni/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: role, // Use dynamic role as userType
          userId: enrollment,
          programName: formData.Program, // New Program (might be changed)
          oldProgramName: oldProgram,   // Old Program (before change)
          oldName: oldName,  
          requestData: formData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await fetchProfile();  // Wait for profile to re-fetch before switching view
        alert("✅ Request submitted successfully!");
        setTab("view");
        setOldProgram(formData.Program);
      }
       else {
        alert(`❌ Submission failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Server error while submitting request.");
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="text-center p-6 text-indigo-700 font-semibold text-xl">⏳ Loading profile...</div>
      </StudentLayout>
    );
  }

  if (!formData) {
    return (
      <StudentLayout>
        <div className="text-center p-6 text-red-600 font-semibold text-xl">❌ Failed to load profile data.</div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="bg-gradient-to-br from-pink-100 via-indigo-100 to-blue-100 p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-12">
        
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTab("view")}
            className={`px-5 py-2 mx-2 rounded-lg shadow-md text-md font-semibold transition ${
              tab === "view" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"
            }`}
          >
            👁 View
          </button>
          <button
            onClick={() => setTab("edit")}
            className={`px-5 py-2 mx-2 rounded-lg shadow-md text-md font-semibold transition ${
              tab === "edit" ? "bg-pink-600 text-white" : "bg-white text-pink-600"
            }`}
          >
            ✏️ Update
          </button>
        </div>
  
        {/* Shared Form Grid (view/edit) */}
        {(tab === "view" || tab === "edit") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg border border-indigo-300 shadow-md">
            {[{ label: "Name", name: "Name", type: "text" },
              { label: "Email", name: "Email", type: "email" },
              { label: "Enrollment", name: "Enrollment", type: "text", disabled: true },
              { label: "University Seat No", name: "UniversitySeatNumber", type: "text", disabled: true },
              { label: "Program", name: "Program", type: "text" },
              { label: "Academic Year", name: "AcademicYear", type: "text" },
              { label: "Gender", name: "Gender", type: "text" },
              { label: "Whatsapp", name: "Whatsapp", type: "text" },
            ].map(({ label, name, type, disabled }) => (
              <div key={name} className="flex flex-col">
                <label className="text-sm font-semibold text-indigo-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  placeholder={label}
                  disabled={tab === "view" || disabled}
                  className={`w-full p-3 border rounded-lg shadow-sm text-gray-800 ${
                    tab === "view" || disabled
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                      : "focus:outline-none focus:ring-2 focus:ring-pink-500"
                  }`}
                />
              </div>
            ))}
  
            {tab === "edit" && (
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg"
                >
                  🚀 Send Request for Update
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default Profile;
