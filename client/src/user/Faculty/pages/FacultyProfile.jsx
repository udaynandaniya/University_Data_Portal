import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FacultyLayout from "../components/FacultyLayout";

const FacultyProfile = () => {
  const [searchParams] = useSearchParams();
  const facultyID = searchParams.get("facultyId");
  // const facultyId = searchParams.get("facultyId");
  const role = searchParams.get("role");
  console.log("\nin profile { facultyID } is ", facultyID )

  const [tab, setTab] = useState("view");
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [oldDepartment, setOldDepartment] = useState("");
  const [oldName, setOldName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("\nRequesting for faculty profile using this :")
        console.log("\nRole :",role)

        const res = await fetch(`http://localhost:5000/profile/faculty/${facultyId}`);
        const data = await res.json();

        if (res.ok) {
          setFormData(data);
          setOldDepartment(data.Department);
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

    if (facultyId && role) fetchProfile();
  }, [facultyId, role]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const departmentChanged = formData.Department !== oldDepartment;

      console.log("\nSending Faculty Update Request:");
      console.log("Role:", role);
      console.log("Faculty ID:", facultyId);
      console.log("Old Department:", oldDepartment);
      console.log("New Department:", formData.Department);

      const res = await fetch("http://localhost:5000/updateRequests/faculty/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: role,
          userId: facultyId,
          department: formData.Department,
          oldDepartment: oldDepartment,
          oldName: oldName,
          requestData: formData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Request submitted successfully!");
        setTab("view");
        setOldDepartment(formData.Department);
      } else {
        alert(`❌ Submission failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Server error while submitting request.");
    }
  };

  if (isLoading) {
    return (
      <FacultyLayout>
        <div className="text-center p-6 text-indigo-700 font-semibold text-xl">⏳ Loading faculty profile...</div>
      </FacultyLayout>
    );
  }

  if (!formData) {
    return (
      <FacultyLayout>
        <div className="text-center p-6 text-red-600 font-semibold text-xl">❌ Failed to load faculty data.</div>
      </FacultyLayout>
    );
  }

  return (
    <FacultyLayout>
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

        {/* Shared Form Grid */}
        {(tab === "view" || tab === "edit") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg border border-indigo-300 shadow-md">
            {[
              { label: "Name", name: "Name", type: "text" },
              { label: "Email", name: "Email", type: "email" },
              { label: "Phone", name: "Phone", type: "text" },
              { label: "Department", name: "Department", type: "text" },
              { label: "Designation", name: "Designation", type: "text" },
              { label: "Faculty ID", name: "FacultyID", type: "text", disabled: true },
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
    </FacultyLayout>
  );
};

export default FacultyProfile;
