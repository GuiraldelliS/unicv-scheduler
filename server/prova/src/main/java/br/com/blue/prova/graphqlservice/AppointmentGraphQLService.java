package br.com.blue.prova.graphqlservice;

import br.com.blue.prova.annotation.GraphQLService;
import br.com.blue.prova.domain.Appointment;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.enumeration.AppointmentStatus;
import br.com.blue.prova.service.AppointmentService;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalTime;

@GraphQLService
public class AppointmentGraphQLService {
    private final AppointmentService appointmentService;

    public AppointmentGraphQLService(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GraphQLQuery
    public Appointment findAppointmentById(@GraphQLArgument(name = "appointmentId")Long appointmentId){
        return appointmentService.findById(appointmentId);
    }

    @GraphQLQuery
    public Page<Appointment> findAllAppointment(@GraphQLArgument(name = "inicialTime")LocalTime inicialTime,
                                                @GraphQLArgument(name = "finalTime")LocalTime finalTime,
                                                @GraphQLArgument(name = "date")LocalDate date,
                                                @GraphQLArgument(name = "appointmentStatus")AppointmentStatus appointmentStatus,
                                                @GraphQLArgument(name = "professionalId")Long professionalId,
                                                @GraphQLArgument(name = "studantId")Long studantId,
                                                @GraphQLArgument(name = "pageableDTO")PageableDTO pageableDTO){
        return appointmentService.findAllAppointment(inicialTime, finalTime, date, appointmentStatus, professionalId, studantId, pageableDTO);
    }

    @GraphQLMutation
    public Appointment createAppointment(@GraphQLArgument(name = "appointment")Appointment appointment){
        return appointmentService.create(appointment);
    }

    @GraphQLMutation
    public Appointment updateAppointment(@GraphQLArgument(name = "appointment")Appointment appointment){
        return appointmentService.update(appointment);
    }

    @GraphQLMutation
    public Appointment alterStatusAppointment(@GraphQLArgument(name = "appointment")Appointment appointment,
                                              @GraphQLArgument(name = "appointmentStatus")AppointmentStatus appointmentStatus){
        return appointmentService.alterStatus(appointment, appointmentStatus);
    }
}
