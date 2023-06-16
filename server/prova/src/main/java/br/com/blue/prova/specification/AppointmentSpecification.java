package br.com.blue.prova.specification;

import br.com.blue.prova.domain.Appointment;
import br.com.blue.prova.enumeration.AppointmentStatus;
import br.com.blue.prova.specification.config.SpecificationDefault;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Component
public class AppointmentSpecification implements SpecificationDefault<Appointment> {

    private Specification<Appointment> inicialTimeAppointment(LocalTime inicialTimeAppointment){
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("startTime"), inicialTimeAppointment);
    }

    private Specification<Appointment> finalTimeAppointment(LocalTime finalTimeAppointment){
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("endTime"), finalTimeAppointment);
    }

    private Specification<Appointment> inicialDateAppointment(LocalDate inicialDateAppointment){
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("date"), inicialDateAppointment);
    }

    private Specification<Appointment> finalDateAppointment(LocalDate finalDateAppointment){
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("date"), finalDateAppointment);
    }

    private Specification<Appointment> appointmentStatus(AppointmentStatus appointmentStatus){
        return (root, query, cb) -> cb.equal(root.get("appointmentStatus"),appointmentStatus);
    }

    private Specification<Appointment> professionalIdAppointment(Long professionalIdAppointment){
        return (root, query, cb) -> cb.equal(root.join("professional").get("id"), professionalIdAppointment);
    }

    private Specification<Appointment> studantIdAppointment(Long studantIdAppointment){
        return (root, query, cb) -> cb.equal(root.join("studant").get("id"), studantIdAppointment);
    }

    public Specification<Appointment> filter(LocalTime inicialTime, LocalTime finalTime,
                                             LocalDate date, AppointmentStatus appointmentStatus,
                                             Long professionalId, Long studantId){
        var builder = builder();

        Optional.ofNullable(inicialTime).map(this::inicialTimeAppointment).ifPresent(builder::and);
        Optional.ofNullable(finalTime).map(this::finalTimeAppointment).ifPresent(builder::and);
        Optional.ofNullable(date).map(this::inicialDateAppointment).ifPresent(builder::and);
        Optional.ofNullable(date).map(this::finalDateAppointment).ifPresent(builder::and);
        Optional.ofNullable(appointmentStatus).map(this::appointmentStatus).ifPresent(builder::and);
        Optional.ofNullable(professionalId).map(this::professionalIdAppointment).ifPresent(builder::and);
        Optional.ofNullable(studantId).map(this::studantIdAppointment).ifPresent(builder::and);

        return builder.build();
    }


}
