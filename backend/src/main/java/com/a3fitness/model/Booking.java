package com.a3fitness.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate bookingDate;

    @Column(nullable = false)
    private LocalTime bookingTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionType sessionType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(length = 2000)
    private String notes;

    @Column
    private String paymentIntentId;

    @Column
    private Boolean paymentCompleted = false;

    @Column
    private LocalDateTime reminderSentAt;

    @Column
    private LocalDateTime cancelledAt;

    @Column
    private String cancellationReason;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum SessionType {
        PERSONAL_60("Personal Training - 60 min", new BigDecimal("80.00")),
        PERSONAL_30("Personal Training - 30 min", new BigDecimal("50.00")),
        ASSESSMENT("Fitness Assessment", new BigDecimal("60.00")),
        NUTRITION("Nutrition Consultation", new BigDecimal("70.00"));

        private final String displayName;
        private final BigDecimal price;

        SessionType(String displayName, BigDecimal price) {
            this.displayName = displayName;
            this.price = price;
        }

        public String getDisplayName() {
            return displayName;
        }

        public BigDecimal getPrice() {
            return price;
        }
    }

    public enum BookingStatus {
        PENDING,
        CONFIRMED,
        COMPLETED,
        CANCELLED,
        NO_SHOW
    }
}
