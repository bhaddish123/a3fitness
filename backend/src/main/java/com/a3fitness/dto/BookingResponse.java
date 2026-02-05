package com.a3fitness.dto;

import com.a3fitness.model.Booking;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class BookingResponse {
    private Long id;
    private LocalDate bookingDate;
    private LocalTime bookingTime;
    private Booking.SessionType sessionType;
    private String sessionTypeDisplay;
    private Booking.BookingStatus status;
    private BigDecimal price;
    private String notes;
    private Boolean paymentCompleted;
    private LocalDateTime createdAt;
    private String userEmail;
    private String userName;

    public BookingResponse(Booking booking) {
        this.id = booking.getId();
        this.bookingDate = booking.getBookingDate();
        this.bookingTime = booking.getBookingTime();
        this.sessionType = booking.getSessionType();
        this.sessionTypeDisplay = booking.getSessionType().getDisplayName();
        this.status = booking.getStatus();
        this.price = booking.getPrice();
        this.notes = booking.getNotes();
        this.paymentCompleted = booking.getPaymentCompleted();
        this.createdAt = booking.getCreatedAt();
        this.userEmail = booking.getUser().getEmail();
        this.userName = booking.getUser().getFullName();
    }
}
