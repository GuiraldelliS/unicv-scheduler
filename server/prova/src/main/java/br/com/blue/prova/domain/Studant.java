package br.com.blue.prova.domain;

import org.apache.catalina.User;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "studant")
public class Studant implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private static final String SEQ_GENERATOR = "studant_id_seq_gen";
    private static final String SEQ_NAME = "studant_id_seq";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_GENERATOR)
    @SequenceGenerator(name = SEQ_GENERATOR, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "active_studant")
    private Boolean activeStudant;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_master_id")
    private UserMaster userMaster;

    @OneToMany(fetch = LAZY, mappedBy = "studant")
    private List<Address> address;

    public Studant() {
    }

    public Studant(Studant studant){
        this.name = studant.getName();
        this.activeStudant = true;
        this.userMaster = studant.getUserMaster();
        this.address = studant.getAddress();
    }

    public Studant(UserMaster userMaster){
        this.name = userMaster.getName();
        this.activeStudant = true;
        this.userMaster = userMaster;
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

    public Boolean getActiveStudant() {
        return activeStudant;
    }

    public void setActiveStudant(Boolean activeStudant) {
        this.activeStudant = activeStudant;
    }

    public UserMaster getUserMaster() {
        return userMaster;
    }

    public void setUserMaster(UserMaster userMaster) {
        this.userMaster = userMaster;
    }

    public List<Address> getAddress() {
        return address;
    }

    public void setAddress(List<Address> address) {
        this.address = address;
    }

    public void updateAddress(List<Address> address){
        this.address.clear();
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Studant studant = (Studant) o;
        return Objects.equals(id, studant.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Studant mergeForUpdate(Studant studant){
        this.setName(studant.getName());
        this.setActiveStudant(studant.getActiveStudant());
        this.setUserMaster(studant.getUserMaster());
        this.setAddress(studant.getAddress());

        return this;
    }

    @Override
    public String toString() {
        return "Studant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", activeStudant=" + activeStudant +
                '}';
    }
}
