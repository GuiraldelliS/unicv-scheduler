package br.com.blue.prova.repository;

import br.com.blue.prova.domain.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {

    @Query(value = """
            select count(id) > 0 from appointment where start_time = :startTime and
            end_time = :endTime and
            "date" = :date and
            professional_id = :professionalId
            """, nativeQuery = true)
    Boolean checkAppointmentAvailability(LocalTime startTime, LocalTime endTime, LocalDate date, Long professionalId);
}
