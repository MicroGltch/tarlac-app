import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
  return (
    <div className="contactus-container">
      {/* Hero Image Section */}
      <div className="contact-hero-image">
        <img
          className="contact-hero-img"
          src="https://via.placeholder.com/800x400"
          alt="Contact Us"
        />
        <div className="contact-hero-text">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you. Let us know how we can help.</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-content-overlap">
        <div className="contact-form-section container shadow p-5 bg-white rounded">
          <h2 className="contact-form-heading">Send Us a Message</h2>
          <form className="row g-4">
            <div className="col-md-6">
              <label htmlFor="firstName" className="contact-form-label">First Name</label>
              <input type="text" className="contact-form-control" id="firstName" placeholder="Enter your first name" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="lastName" className="contact-form-label">Last Name</label>
              <input type="text" className="contact-form-control" id="lastName" placeholder="Enter your last name" required />
            </div>

            <div className="col-12">
              <label htmlFor="email" className="contact-form-label">Email Address</label>
              <input type="email" className="contact-form-control" id="email" placeholder="you@example.com" required />
            </div>

            <div className="col-12">
              <label htmlFor="message" className="contact-form-label">Message</label>
              <textarea className="contact-form-control" id="message" rows="5" placeholder="Write your message here..." required></textarea>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="contact-btn btn-primary contact-submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ContactUs;