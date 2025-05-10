const DashboardCard = ({ title, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-10 flex items-center justify-center cursor-pointer transform hover:scale-105 hover:bg-indigo-100"
      >
        <h2 className="text-3xl font-bold text-indigo-700">{title}</h2>
      </div>
    );
  };
  
  export default DashboardCard;
  