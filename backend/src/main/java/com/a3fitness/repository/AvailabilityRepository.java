package com.a3fitness.repository;

import com.a3fitness.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByDayOfWeekAndIsActiveTrue(DayOfWeek dayOfWeek);
    List<Availability> findByIsActiveTrue();
}
