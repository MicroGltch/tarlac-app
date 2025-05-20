import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import News from './pages/News';
import Activities from './pages/Activities';
import Organization from './pages/Organization';
import ContactUs from './pages/ContactUs';
import Footer from './Footer';


const FloatingNavbar = () => {
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "News", path: "/news" },
    { name: "Activities", path: "/activities" },
    { name: "Organization", path: "/organization" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="floating-navbar">
      <div className="nav-left">
        <NavLink to="/">
          <img src="/logo.png" alt="Tarlac Medical Society Logo" />
        </NavLink>
        <div>
          <div>Tarlac Medical Society</div>
          <div className="nav-subtitle">A component society of the Philippine Medical Association</div>
        </div>
      </div>
      <nav className="nav-right">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              rounded-full transition-colors duration-200
              ${isActive ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"}
            `}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <FloatingNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/news" element={<News />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
