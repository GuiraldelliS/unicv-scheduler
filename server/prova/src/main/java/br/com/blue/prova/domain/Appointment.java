package br.com.blue.prova.domain;

import br.com.blue.prova.enumeration.AppointmentStatus;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

@Entity
@Table(name = "appointment")
public class Appointment implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private static final String SEQ_GENERATOR = "appointment_id_seq_gen";
    private static final String SEQ_NAME = "appointment_id_seq";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_GENERATOR)
    @SequenceGenerator(name = SEQ_GENERATOR, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "date")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_status")
    private AppointmentStatus appointmentStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professional_id")
    private Professional professional;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studant_id")
    private Studant studant;

    public Appointment() {
    }

    public Appointment(Appointment appointment) {
        this.startTime = appointment.getStartTime();
        this.endTime = appointment.getEndTime();
        this.date = appointment.getDate();
        this.appointmentStatus = appointment.getAppointmentStatus();
        this.professional = appointment.getProfessional();
        this.studant = appointment.getStudant();

    }

    public Long getId() {
        return id;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getRunningTime(){
        return String.valueOf(this.getStartTime().compareTo(this.getEndTime()));
    }

    public LocalDateTime getCompleteDate(){
        return LocalDateTime.of(this.getDate(), this.getStartTime());
    }

    public AppointmentStatus getAppointmentStatus() {
        return appointmentStatus;
    }

    public void setAppointmentStatus(AppointmentStatus appointmentStatus) {
        this.appointmentStatus = appointmentStatus;
    }

    public Professional getProfessional() {
        return professional;
    }

    public void setProfessional(Professional professional) {
        this.professional = professional;
    }

    public Studant getStudant() {
        return studant;
    }

    public void setStudant(Studant studant) {
        this.studant = studant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Appointment mergeForUpdate(Appointment appointment){
        appointment.setStartTime(appointment.getStartTime());
        appointment.setEndTime(appointment.getEndTime());
        appointment.setDate(appointment.getDate());
        appointment.setAppointmentStatus(appointment.getAppointmentStatus());
        appointment.setProfessional(appointment.getProfessional());
        appointment.setStudant(appointment.getStudant());

        return this;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", date=" + date +
                ", appointmentStatus=" + appointmentStatus +
                '}';
    }
}
