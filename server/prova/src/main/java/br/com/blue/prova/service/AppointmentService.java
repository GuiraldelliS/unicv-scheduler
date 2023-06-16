package br.com.blue.prova.service;

import br.com.blue.prova.domain.Appointment;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.enumeration.AppointmentStatus;
import br.com.blue.prova.repository.AppointmentRepository;
import br.com.blue.prova.specification.AppointmentSpecification;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AppointmentSpecification appointmentSpecification;

    public AppointmentService(AppointmentRepository appointmentRepository, AppointmentSpecification appointmentSpecification) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentSpecification = appointmentSpecification;
    }

    @Transactional(readOnly = true)
    public Appointment findById(Long appointmentId){
        return appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found!"));
    }

    @Transactional(readOnly = true)
    public Page<Appointment> findAllAppointment(LocalTime inicialTime, LocalTime finalTime,
                                                LocalDate date, AppointmentStatus appointmentStatus,
                                                Long professionalId, Long studantId,
                                                PageableDTO pageableDTO){
        return appointmentRepository.findAll(
                appointmentSpecification.filter(inicialTime, finalTime, date, appointmentStatus, professionalId, studantId), pageableDTO.getPageable());
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private Appointment save(Appointment appointment){
        return appointmentRepository.save(appointment);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Appointment create(Appointment appointment){
        return this.save(new Appointment(appointment));
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Appointment update(Appointment appointment){
        var restoredAppointment = this.findById(appointment.getId());

        if(restoredAppointment.getDateComplete().isBefore(LocalDateTime.now())){
            throw new RuntimeException("...");
        }

        restoredAppointment.mergeForUpdate(appointment);

        return this.save(restoredAppointment);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Appointment alterStatus(Appointment appointment, AppointmentStatus appointmentStatus){
        var restoredAppointment = this.findById(appointment.getId());

        restoredAppointment.setAppointmentStatus(appointmentStatus);

        return this.update(restoredAppointment);
    }
}
