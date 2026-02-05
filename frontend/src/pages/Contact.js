import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Get In Touch</h1>
        <p>Have questions? Reach out anytime</p>
      </div>

      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h3>Email</h3>
                <p>drew@a3fitness.com</p>
                <small>Response within 24 hours</small>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <h3>Phone</h3>
                <p>(555) 123-4567</p>
                <small>Mon-Sat, 8AM - 8PM</small>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Location</h3>
                <p>Downtown Fitness Center</p>
                <small>123 Main Street, Suite 200</small>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">🌐</div>
              <div>
                <h3>Social Media</h3>
                <div className="social-links">
                  <a href="#">Instagram</a>
                  <a href="#">Facebook</a>
                  <a href="#">Twitter</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send a Message</h2>
            {submitted && <div className="alert alert-success">Message sent successfully!</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
