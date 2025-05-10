
// Home.jsx
import { useLocation } from "react-router-dom";
import Student from "./Student";
import Alumni from "./Alumni";
import { FaBookOpen } from "react-icons/fa";

const Home = () => {
  const location = useLocation();
  const role = location.state?.role;
  const enrollment = location.state?.enrollment; 

    console.log('\nin home.jsx');
     
    console.log('\nRole:', role);
    console.log('\nenrollment:', enrollment);
  

  if (role === "Student") {
    return <Student enrollment={enrollment} />;
  } else if (role === "Alumni") {
    return <Alumni enrollment={enrollment} />;
  }

  // Default welcome message if no role passed
  return (
    <div className="text-center mt-20 text-2xl font-bold">
      <h1>Welcome to the Home Page 🎉</h1>
      <div className="mt-10">
        <FaBookOpen className="text-6xl text-blue-500" />
        <h2 className="mt-4 text-xl">Empowering Minds Through Education</h2>
        <p className="mt-2 text-lg">
          Education is the most powerful weapon which you can use to change the world.
        </p>
        <img 
          src="https://via.placeholder.com/400"
          alt="Education"
          className="mt-6 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Home;
