import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src="/logo.png" alt="Tarlac Medical Society Logo" />
          <p>Tarlac Medical Society</p>
          <p className="subtitle">A component society of the Philippine Medical Association</p>
        </div>

        <div className="footer-right">
          <div className="social-links">
            <h6 style={{ marginBottom: '1rem' }}>Social Media Links:</h6>
            <div className="social-icons">
              <a href="https://www.facebook.com/tms.tarlac" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/images/facebook.png" 
                  alt="Facebook" 
                  style={{ width: '50px', height: '50px' }}
                /> 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;