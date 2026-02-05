package com.a3fitness.dto;

import com.a3fitness.model.Booking;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingRequest {
    
    @NotNull(message = "Booking date is required")
    @Future(message = "Booking date must be in the future")
    private LocalDate bookingDate;
    
    @NotNull(message = "Booking time is required")
    private LocalTime bookingTime;
    
    @NotNull(message = "Session type is required")
    private Booking.SessionType sessionType;
    
    private String notes;
}
