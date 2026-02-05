import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Booking.css';

const Booking = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState({});

  const [formData, setFormData] = useState({
    sessionType: '',
    notes: '',
  });

  useEffect(() => {
    loadAvailableSlots();
  }, []);

  const loadAvailableSlots = async () => {
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 30);

      const response = await bookingAPI.getAvailableSlots(
        today.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      setAvailableSlots(response.data);
    } catch (err) {
      console.error('Failed to load slots:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookingData = {
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        sessionType: formData.sessionType,
        notes: formData.notes,
      };

      await bookingAPI.createBooking(bookingData);
      setSuccess(true);
      setFormData({ sessionType: '', notes: '' });
      setSelectedDate('');
      setSelectedTime('');
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const sessionTypes = [
    { value: 'PERSONAL_60', label: 'Personal Training - 60 min ($80)', price: 80 },
    { value: 'PERSONAL_30', label: 'Personal Training - 30 min ($50)', price: 50 },
    { value: 'ASSESSMENT', label: 'Fitness Assessment ($60)', price: 60 },
    { value: 'NUTRITION', label: 'Nutrition Consultation ($70)', price: 70 },
  ];

  const selectedSessionType = sessionTypes.find(s => s.value === formData.sessionType);

  return (
    <div className="booking-page">
      <div className="page-header">
        <h1>Book Your Session</h1>
        <p>Choose a date and time that works for you</p>
      </div>

      <div className="container">
        {success && <div className="alert alert-success">Booking created successfully! Check your dashboard.</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="booking-grid">
          <div className="calendar-section card">
            <h3>Select Date & Time</h3>
            <div className="available-dates">
              {Object.keys(availableSlots).map(date => (
                <div key={date} className="date-group">
                  <h4>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h4>
                  <div className="time-slots">
                    {availableSlots[date].map(time => (
                      <button
                        key={time}
                        className={`time-slot ${selectedDate === date && selectedTime === time ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime(time);
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-form-section card">
            <h3>Complete Your Booking</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Session Type</label>
                <select
                  value={formData.sessionType}
                  onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                  required
                >
                  <option value="">Select session type</option>
                  {sessionTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific goals or concerns?"
                />
              </div>

              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="summary-item">
                  <span>Date:</span>
                  <span>{selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Not selected'}</span>
                </div>
                <div className="summary-item">
                  <span>Time:</span>
                  <span>{selectedTime || 'Not selected'}</span>
                </div>
                <div className="summary-item">
                  <span>Session:</span>
                  <span>{selectedSessionType?.label.split('(')[0] || 'Not selected'}</span>
                </div>
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>${selectedSessionType?.price || 0}</span>
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Booking...' : 'Book & Pay'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
