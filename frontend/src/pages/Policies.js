import '../styles/Policies.css';
import React from 'react';

const Policies = () => {
  return (
    <div className="policies-page">
      <div className="page-header">
        <h1>Policies & FAQ</h1>
        <p>Clear, transparent policies for a smooth training experience</p>
      </div>

      <div className="container">
        <div className="policies-grid">
          <div className="policy-card">
            <h3>Cancellation Policy</h3>
            <ul>
              <li>Cancel up to 24 hours before for full refund</li>
              <li>12-24 hours: 50% credit toward future session</li>
              <li>Less than 12 hours: No refund</li>
              <li>Emergency exceptions reviewed case-by-case</li>
            </ul>
          </div>

          <div className="policy-card">
            <h3>Rescheduling</h3>
            <ul>
              <li>Reschedule anytime up to 24 hours before</li>
              <li>Unlimited rescheduling with proper notice</li>
              <li>Sessions valid for 90 days from purchase</li>
              <li>Easy rescheduling through your dashboard</li>
            </ul>
          </div>

          <div className="policy-card">
            <h3>Payment & Pricing</h3>
            <ul>
              <li>Secure payment at time of booking</li>
              <li>Package discounts available for bulk sessions</li>
              <li>All prices include facility access</li>
              <li>No hidden fees or surprise charges</li>
            </ul>
          </div>

          <div className="policy-card">
            <h3>Session Guidelines</h3>
            <ul>
              <li>Arrive 5 minutes early for check-in</li>
              <li>Bring water bottle and gym towel</li>
              <li>Wear appropriate athletic attire</li>
              <li>Late arrivals reduce available session time</li>
            </ul>
          </div>

          <div className="policy-card">
            <h3>No-Show Policy</h3>
            <ul>
              <li>First no-show: Warning + booking restriction</li>
              <li>Second no-show: Session forfeited</li>
              <li>Repeated no-shows may result in account suspension</li>
              <li>Emergency situations will be considered</li>
            </ul>
          </div>

          <div className="policy-card">
            <h3>Health & Safety</h3>
            <ul>
              <li>Complete health questionnaire before first session</li>
              <li>Inform trainer of any injuries or conditions</li>
              <li>Facility follows all safety protocols</li>
              <li>Emergency procedures in place</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
