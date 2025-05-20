import React from 'react';
import { FaUsers, FaHandshake, FaShieldAlt, FaStethoscope, FaHeart, FaUniversity, FaHandsHelping, FaGavel } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutUs() {
  const objectives = [
    { icon: <FaUsers />, text: "Foster unity and camaraderie among physicians practicing in Tarlac." },
    { icon: <FaHandshake />, text: "Strengthen member engagement through recruitment, retention, and reintegration efforts." },
    { icon: <FaShieldAlt />, text: "Uphold the nobility and dignity of the profession through high standards of ethical practice, research and continuing medical education (CME)." },
    { icon: <FaStethoscope />, text: "Safeguard the legitimate rights and interests of Tarlac physicians." },
    { icon: <FaHeart />, text: "Promote fraternal relations among all members and allied professionals." },
    { icon: <FaUniversity />, text: "Support the initiatives, programs, and projects of the Philippine Medical Association (PMA)." },
    { icon: <FaHandsHelping />, text: "Serve the healthcare needs of the community, promote wellness and disease prevention with benevolence." },
    { icon: <FaGavel />, text: "Safeguard the public from unethical and unlawful medical practices." },
  ];

  return (
    <div className="about-page">
     <section className="about-hero-section">
        <div className="overlay">
          <h1>About Us</h1>
          <p>Tarlac Medical Society – Vision, Mission and Objectives</p>
        </div>
      </section>

      <section className="about-content-section">
        <h2 className="about-section-title">Our Vision</h2>
        <p className="lead">
          To cultivate a community of Tarlac physicians committed to excellence in medical knowledge and expertise by fostering continuous learning, advancing research, and advocating best practices in patient care.
        </p>
      </section>

      {/* Mission */}
      <section className="about-content-section">
        <div className="about-container">
          <h2 className="about-section-title">Our Mission</h2>
          <p className="lead">
            TMS is a unified organization dedicated to serving its members by offering benefits, fostering professional growth while protecting their best interest in accordance with both Divine and Natural laws. Wellness, disease prevention and quality healthcare are delivered with compassion to the different communities through collaboration with private organizations and government agencies.
          </p>
        </div>
      </section>

      <section className="about-content-section">
        <h2>Objectives</h2>
        <div className="objectives">
          {objectives.map((item, index) => (
            <div key={index} className="objective-item">
              <div className="about-icon">{item.icon}</div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;