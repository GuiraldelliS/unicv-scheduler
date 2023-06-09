package br.com.blue.prova.domain;

import javax.persistence.*;
import javax.persistence.Table;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "departament")
public class Department implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID_V1")
    private UUID id;

    @Column(name = "description")
    private String description;

    @Column(name = "responsible")
    private String responsible;

    @ManyToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List<Professional> professionalList;

    public UUID getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResponsible() {
        return responsible;
    }

    public void setResponsible(String responsible) {
        this.responsible = responsible;
    }

    public List<Professional> getProfessionalList() {
        return professionalList;
    }

    public void setProfessionalList(List<Professional> professionalList) {
        this.professionalList = professionalList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Department that = (Department) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Department mergeForUpdate(Department department){
        department.setDescription(department.getDescription());
        department.setProfessionalList(department.getProfessionalList());

        return this;
    }

    @Override
    public String toString() {
        return "Department{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", responsible='" + responsible + '\'' +
                '}';
    }
}
