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
    private final ProfessionalService professionalService;
    private final AppointmentRepository appointmentRepository;
    private final AppointmentSpecification appointmentSpecification;

    public AppointmentService(ProfessionalService professionalService, AppointmentRepository appointmentRepository, AppointmentSpecification appointmentSpecification) {
        this.professionalService = professionalService;
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

    @Transactional(readOnly = true)
    private Boolean checkAppointmentAvailability(Appointment appointment){
        var startTime = appointment.getStartTime();
        var endTime = appointment.getEndTime();
        var date = appointment.getDate();
        var professionalId = appointment.getProfessional().getId();

        return appointmentRepository.checkAppointmentAvailability(startTime, endTime, date, professionalId);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private Appointment save(Appointment appointment){
        var restoredProfessional = professionalService.findById(appointment.getProfessional().getId());

        if(checkAppointmentAvailability(appointment)){
            throw new RuntimeException("You already have an appointment at this time for this professional: " + restoredProfessional.getName() + ".");
        }

        if(restoredProfessional.getActiveProfessional()){
            throw new RuntimeException("Inactive professional: " + restoredProfessional.getName());
        }

        return appointmentRepository.save(appointment);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Appointment create(Appointment appointment){
        return this.save(new Appointment(appointment));
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Appointment update(Appointment appointment){
        var restoredAppointment = this.findById(appointment.getId());

        if(restoredAppointment.getCompleteDate().isBefore(LocalDateTime.now())){
            throw new RuntimeException("The date of the appointment is greater than the current date!");
        }

        if(checkAppointmentStatus(restoredAppointment)){
            throw new RuntimeException("Because of the appointment status you can't change: " + restoredAppointment.getAppointmentStatus());
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

    private Boolean checkAppointmentStatus(Appointment appointment){
        var logical =  Boolean.logicalOr(appointment.getAppointmentStatus().equals(AppointmentStatus.FINISHED),
                appointment.getAppointmentStatus().equals(AppointmentStatus.CANCELLED));

        return Boolean.logicalOr(logical, appointment.getAppointmentStatus().equals(AppointmentStatus.CONFIRMED));
    }
}
