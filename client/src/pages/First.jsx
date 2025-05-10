// // src/pages/First.jsx
// import { useNavigate } from "react-router-dom";

// const First = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
//       <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">

//         {/* Student/Alumni Block */}
//         <div
//           onClick={() => navigate("/login")}
//           className="bg-white shadow-xl p-10 rounded-2xl text-center cursor-pointer hover:scale-105 transition duration-300"
//         >
//           <h2 className="text-2xl font-bold text-indigo-600 mb-4">Student / Alumni</h2>
//           <p className="text-gray-600">Join the alumni network, explore jobs & stay connected.</p>
//         </div>

//         {/* Admin Block */}
//         <div
//           onClick={() => navigate("/admin-login")}
//           className="bg-white shadow-xl p-10 rounded-2xl text-center cursor-pointer hover:scale-105 transition duration-300"
//         >
//           <h2 className="text-2xl font-bold text-purple-600 mb-4">Admin</h2>
//           <p className="text-gray-600">Manage alumni system securely with admin access.</p>
//         </div>

//         {/* Faculty Block */}
//         <div
//           onClick={() => navigate("/faculty-login")}
//           className="bg-white shadow-xl p-10 rounded-2xl text-center cursor-pointer hover:scale-105 transition duration-300"
//         >
//           <h2 className="text-2xl font-bold text-teal-600 mb-4">Faculty</h2>
//           <p className="text-gray-600">Connect with students and alumni, post updates.</p>
//         </div>

//          {/* Department Block */}
//          <div
//           onClick={() => navigate("/department-login")}
//           className="bg-white shadow-xl p-10 rounded-2xl text-center cursor-pointer hover:scale-105 transition duration-300"
//         >
//           <h2 className="text-2xl font-bold text-blue-950 mb-4">Department</h2>
//           <p className="text-gray-600">Manage students, alumni, faculties and accounts.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default First;

// src/pages/First.jsx
import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      
      {/* University Data Portal Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-10">
        University Data Portal
      </h1>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">

        {/* Student/Alumni Block */}
        <div
          onClick={() => navigate("/login")}
          className="bg-white shadow-xl p-10 rounded-2xl text-center cursor-pointer hover:scale-105 transition duration-300"
        >
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Student / Alumni</h2>
          <p className="text-gray-600">Join the alumni network, explore jobs & stay connected.</p>
        </div>

        {/* Admin Block */}
        <div
          onClick={() => navigate("/admin-login")}
          className="bg-white shadow-xl p-10 rounded-2xl text-center cursor-pointer hover:scale-105 transition duration-300"
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Admin</h2>
          <p className="text-gray-600">Manage alumni system securely with admin access.</p>
        </div>

        {/* Faculty Block */}
        <div
          onClick={() => navigate("/faculty-login")}
          className="bg-white shadow-xl p-10 rounded-2xl text-center cursor-pointer hover:scale-105 transition duration-300"
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-4">Faculty</h2>
          <p className="text-gray-600">Connect with students and alumni, post updates.</p>
        </div>

        {/* Department Block */}
        <div
          onClick={() => navigate("/department-login")}
          className="bg-white shadow-xl p-10 rounded-2xl text-center cursor-pointer hover:scale-105 transition duration-300"
        >
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Department</h2>
          <p className="text-gray-600">Manage students, alumni, faculties and accounts.</p>
        </div>
      </div>
    </div>
  );
};

export default First;
