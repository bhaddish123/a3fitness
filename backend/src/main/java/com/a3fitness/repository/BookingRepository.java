package com.a3fitness.repository;

import com.a3fitness.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUserId(Long userId);
    
    List<Booking> findByBookingDateAndStatus(LocalDate date, Booking.BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.bookingDate = :date AND b.bookingTime = :time AND b.status != 'CANCELLED'")
    List<Booking> findByDateAndTime(@Param("date") LocalDate date, @Param("time") LocalTime time);
    
    @Query("SELECT b FROM Booking b WHERE b.bookingDate BETWEEN :startDate AND :endDate AND b.status != 'CANCELLED'")
    List<Booking> findBookingsBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.status = 'CONFIRMED' AND b.reminderSentAt IS NULL AND b.bookingDate = :tomorrow")
    List<Booking> findBookingsNeedingReminders(@Param("tomorrow") LocalDate tomorrow);
}
