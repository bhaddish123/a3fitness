import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Transform Your Body,<br /><span>Elevate Your Life</span></h1>
            <p>Personal training designed for real results. Book your session directly, train with confidence, and achieve your fitness goals with expert guidance.</p>
            <div className="hero-cta">
              <Link to="/booking" className="btn-primary">Book Your Session</Link>
              <Link to="/about" className="btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Clients Trained</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Client Retention</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Train With Drew?</h2>
            <p>Professional training with seamless booking and complete transparency</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Online Booking</h3>
              <p>No more walk-ins or workshop dependencies. Book directly with real-time availability.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Secure Payments</h3>
              <p>Integrated payment system with instant confirmation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Smart Reminders</h3>
              <p>Automated email and SMS reminders so you never miss a session.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Direct Communication</h3>
              <p>Message Drew directly through the platform.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Flexible Rescheduling</h3>
              <p>Life happens. Reschedule or cancel sessions easily.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Clear Policies</h3>
              <p>No hidden fees or confusion. Everything is transparent.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
