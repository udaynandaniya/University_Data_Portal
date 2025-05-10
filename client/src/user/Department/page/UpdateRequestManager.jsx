import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateRequestManager = () => {
  const location = useLocation();
  const departmentName = location.state?.departmentName;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/updateRequests/${departmentName}`);
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch update requests:", err);
      }
    };

    fetchRequests();
  }, [departmentName]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/updateRequests/update-status/${id}`, { status });
      setRequests(prev =>
        prev.map(req => (req._id === id ? { ...req, status } : req))
      );
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📄 Update Requests</h2>
      {requests.length === 0 ? (
        <p>No requests submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req._id} className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-600">👤 {req.userType} ({req.userId})</p>
              <pre className="bg-gray-100 p-2 rounded my-2">{JSON.stringify(req.requestData, null, 2)}</pre>
              <p>Status: <strong className={req.status === 'pending' ? 'text-yellow-600' : req.status === 'approved' ? 'text-green-600' : 'text-red-600'}>{req.status}</strong></p>
              {req.status === 'pending' && (
                <div className="mt-2 space-x-2">
                  <button onClick={() => handleStatusChange(req._id, 'approved')} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                  <button onClick={() => handleStatusChange(req._id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpdateRequestManager;
