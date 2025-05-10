// path: Student/components/StudentLayout.jsx
import Navbar from "./Navbar";

const StudentLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar role="student" />
      <main className="pt-20 px-4">{children}</main>
    </div>
  );
};

export default StudentLayout;
