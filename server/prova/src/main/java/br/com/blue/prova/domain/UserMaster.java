package br.com.blue.prova.domain;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "user_master")
public class UserMaster implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "document")
    private String document;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "password")
    private String password;

    @Column(name = "active_user_master")
    private Boolean activeUserMaster;

    public UserMaster() {
    }

    public UserMaster(UserMaster userMaster){
        this.id = userMaster.getId();
        this.name = userMaster.getName();
        this.document = userMaster.getDocument();
        this.email = userMaster.getEmail();
        this.phone = userMaster.getPhone();
        this.password = userMaster.getPassword();
        this.activeUserMaster = true;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getActiveUserMaster() {
        return activeUserMaster;
    }

    public void setActiveUserMaster(Boolean activeUserMaster) {
        this.activeUserMaster = activeUserMaster;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserMaster userMaster = (UserMaster) o;
        return Objects.equals(id, userMaster.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public UserMaster mergeForUpdate(UserMaster userMaster){
        userMaster.setName(userMaster.getName());
        userMaster.setDocument(userMaster.getDocument());
        userMaster.setEmail(userMaster.getEmail());
        userMaster.setPhone(userMaster.getPhone());
        userMaster.setActiveUserMaster(userMaster.getActiveUserMaster());

        return this;
    }

    @Override
    public String toString() {
        return "UserMaster{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", document=" + document + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
