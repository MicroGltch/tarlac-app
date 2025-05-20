import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src="/logo.png" alt="Tarlac Medical Society Logo" />
          <p>Tarlac Medical Society</p>
          <p className="subtitle">A component society of the Philippine Medical Association</p>
          <div className="social-links">
            <a href="https://www.facebook.com/tms.tarlac" target="_blank" rel="noopener noreferrer">
              <img 
                src="/images/facebook.png" 
                alt="Facebook" 
                style={{ width: '50px', height: '50px' }}
              />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <h3>Our Sponsors</h3>
          <div className="sponsors-grid">
            <img src="/images/sponsors/Airia.png" alt="Airia" />
            <img src="/images/sponsors/Snowflake.png" alt="Snowflake" />
            <img src="/images/sponsors/Avanade.png" alt="Avanade" />
            <img src="/images/sponsors/Macquarie-Technology-Group.png" alt="Macquarie" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;