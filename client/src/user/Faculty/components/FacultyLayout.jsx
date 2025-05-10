// path: Faculty/components/FacultyLayout.jsx
import Navbar from "./FacultyNavbar";

const FacultyLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar role="faculty" />
      <main className="pt-20 px-4">{children}</main>
    </div>
  );
};

export default FacultyLayout;
