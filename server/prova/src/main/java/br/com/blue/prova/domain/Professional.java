package br.com.blue.prova.domain;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "professional")
public class Professional implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private static final String SEQ_GENERATOR = "professional_id_seq_gen";
    private static final String SEQ_NAME = "professional_id_seq";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_GENERATOR)
    @SequenceGenerator(name = SEQ_GENERATOR, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "active_professional")
    private Boolean activeProfessional;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_master_id")
    private UserMaster userMaster;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "professional_departament",
            joinColumns = @JoinColumn(name = "professional_id"),
            inverseJoinColumns = @JoinColumn(name = "departament_id"))
    private List<Department> department;

    public Professional() {
    }

    public Professional(Professional professional) {
        this.name = professional.getName();
        this.activeProfessional = true;
        this.userMaster = professional.getUserMaster();
        this.department = professional.getDepartment();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getActiveProfessional() {
        return activeProfessional;
    }

    public void setActiveProfessional(Boolean activeProfessional) {
        this.activeProfessional = activeProfessional;
    }

    public UserMaster getUserMaster() {
        return userMaster;
    }

    public void setUserMaster(UserMaster userMaster) {
        this.userMaster = userMaster;
    }

    public List<Department> getDepartment() {
        return department;
    }

    public void setDepartment(List<Department> department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Professional that = (Professional) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Professional mergeForUpdate(Professional professional){
        professional.setName(professional.getName());
        professional.setActiveProfessional(professional.getActiveProfessional());
        professional.setUserMaster(professional.getUserMaster());
        professional.setDepartment(professional.getDepartment());

        return this;
    }

    @Override
    public String toString() {
        return "Professional{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", activeProfessional=" + activeProfessional +
                '}';
    }
}
