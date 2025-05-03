
import './App.css';
import React from "react";

const FloatingNavbar = () => {
  const navItems = [
    "Tarlac Medical Society",
    "About Us",
    "Our Legacy",
    "Milestones",
    "Organization",
  ];

  return (
    <div className="floating-navbar">
      <nav className="bg-[#292f45] text-white rounded-full shadow-lg flex px-4 py-2 gap-3 items-center backdrop-blur-sm">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`rounded-full text-sm px-4 py-2 transition-colors duration-200 ${
              item === "Technology" ? "bg-[#3d425a] shadow-inner" : "bg-transparent hover:bg-[#3d425a]"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

const section1 = () =>{
return(
  <div className='Section1'>
    
  </div>
);
};



export default FloatingNavbar;
