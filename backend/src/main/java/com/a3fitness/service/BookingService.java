package com.a3fitness.service;

import com.a3fitness.dto.BookingRequest;
import com.a3fitness.dto.BookingResponse;
import com.a3fitness.model.Availability;
import com.a3fitness.model.Booking;
import com.a3fitness.model.User;
import com.a3fitness.repository.AvailabilityRepository;
import com.a3fitness.repository.BookingRepository;
import com.a3fitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if slot is available
        if (!isTimeSlotAvailable(request.getBookingDate(), request.getBookingTime())) {
            throw new RuntimeException("This time slot is not available");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBookingDate(request.getBookingDate());
        booking.setBookingTime(request.getBookingTime());
        booking.setSessionType(request.getSessionType());
        booking.setPrice(request.getSessionType().getPrice());
        booking.setNotes(request.getNotes());
        booking.setStatus(Booking.BookingStatus.PENDING);
        booking.setPaymentCompleted(false);

        Booking savedBooking = bookingRepository.save(booking);
        return new BookingResponse(savedBooking);
    }

    public List<BookingResponse> getUserBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUserId(user.getId()).stream()
                .map(BookingResponse::new)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Long bookingId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to booking");
        }

        return new BookingResponse(booking);
    }

    @Transactional
    public BookingResponse confirmBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        booking.setPaymentCompleted(true);

        Booking updatedBooking = bookingRepository.save(booking);
        return new BookingResponse(updatedBooking);
    }

    @Transactional
    public void cancelBooking(Long bookingId, String userEmail, String reason) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to booking");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking.setCancellationReason(reason);
        booking.setCancelledAt(java.time.LocalDateTime.now());

        bookingRepository.save(booking);
    }

    public Map<String, List<String>> getAvailableSlots(LocalDate startDate, LocalDate endDate) {
        Map<String, List<String>> availableSlots = new HashMap<>();

        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            List<Availability> dayAvailability = availabilityRepository
                    .findByDayOfWeekAndIsActiveTrue(currentDate.getDayOfWeek());

            if (!dayAvailability.isEmpty()) {
                List<String> slots = new ArrayList<>();
                for (Availability availability : dayAvailability) {
                    LocalTime currentTime = availability.getStartTime();
                    while (currentTime.isBefore(availability.getEndTime())) {
                        if (isTimeSlotAvailable(currentDate, currentTime)) {
                            slots.add(currentTime.toString());
                        }
                        currentTime = currentTime.plusMinutes(availability.getSlotDurationMinutes());
                    }
                }
                availableSlots.put(currentDate.toString(), slots);
            }

            currentDate = currentDate.plusDays(1);
        }

        return availableSlots;
    }

    private boolean isTimeSlotAvailable(LocalDate date, LocalTime time) {
        List<Booking> existingBookings = bookingRepository.findByDateAndTime(date, time);
        return existingBookings.isEmpty();
    }
}
