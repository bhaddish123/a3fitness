import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingAPI.cancelBooking(bookingId, 'User cancelled');
      loadBookings();
    } catch (err) {
      setError('Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      CONFIRMED: 'success',
      COMPLETED: 'info',
      CANCELLED: 'error',
      NO_SHOW: 'error',
    };
    return colors[status] || 'info';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Welcome back, {user?.fullName}!</h1>
        <p>Manage your training sessions</p>
      </div>

      <div className="container">
        {error && <div className="alert alert-error">{error}</div>}

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <div className="stat-value">{bookings.length}</div>
          </div>
          <div className="stat-card">
            <h3>Upcoming</h3>
            <div className="stat-value">
              {bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING').length}
            </div>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <div className="stat-value">
              {bookings.filter(b => b.status === 'COMPLETED').length}
            </div>
          </div>
        </div>

        <div className="bookings-section">
          <h2>Your Bookings</h2>
          {bookings.length === 0 ? (
            <div className="empty-state">
              <p>No bookings yet. <a href="/booking">Book your first session!</a></p>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h3>{booking.sessionTypeDisplay}</h3>
                    <span className={`status-badge ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-details">
                    <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {booking.bookingTime}</p>
                    <p><strong>Price:</strong> ${booking.price}</p>
                    {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                  </div>
                  {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                    <div className="booking-actions">
                      <button 
                        className="btn-danger" 
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
