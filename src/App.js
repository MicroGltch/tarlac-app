import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import News from './pages/News';
import Activities from './pages/Activities';
import ContactUs from './pages/ContactUs';
import Footer from './Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const FloatingNavbar = () => {
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "News", path: "/news" },
    { name: "Activities", path: "/activities" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="floating-navbar">
      <div className="nav-left">
        <NavLink to="/home">  
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

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FloatingNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/news" element={<News />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
