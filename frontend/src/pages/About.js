import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>Meet Drew</h1>
        <p>Your certified personal trainer dedicated to your success</p>
      </div>
      
      <div className="container">
        <div className="about-content">
          <section className="bio-section">
            <h2>Expert Training, Proven Results</h2>
            <p>
              With over a decade of experience in personal training and fitness coaching, Drew has helped hundreds of clients achieve their fitness goals through customized training programs and dedicated support.
            </p>
            <p>
              Specializing in strength training, weight loss, and athletic performance, Drew combines science-based methods with motivational coaching to deliver real, sustainable results.
            </p>
          </section>

          <section className="credentials-section">
            <h2>Certifications & Experience</h2>
            <div className="credentials-grid">
              <div className="credential-card">
                <h3>🏅 NASM Certified</h3>
                <p>National Academy of Sports Medicine Personal Trainer</p>
              </div>
              <div className="credential-card">
                <h3>🥗 Nutrition Specialist</h3>
                <p>Certified Nutrition Coach</p>
              </div>
              <div className="credential-card">
                <h3>💪 10+ Years Experience</h3>
                <p>Decade of professional training</p>
              </div>
              <div className="credential-card">
                <h3>👥 500+ Clients</h3>
                <p>Successfully transformed lives</p>
              </div>
            </div>
          </section>

          <section className="specialties-section">
            <h2>Training Specialties</h2>
            <ul className="specialties-list">
              <li>Strength Training & Muscle Building</li>
              <li>Weight Loss & Body Composition</li>
              <li>Athletic Performance Enhancement</li>
              <li>Functional Fitness & Mobility</li>
              <li>Nutrition Coaching & Meal Planning</li>
              <li>Injury Prevention & Rehabilitation</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
