package br.com.blue.prova.domain;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "address")
public class Address implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID_V1")
    private UUID id;

    @Column(name = "street")
    private String street;

    @Column(name = "neighborhood")
    private String neighborhood;

    @Column(name = "house_number")
    private String houseNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "address_lead")
    private Boolean addressLead;

    @Column(name = "active_address")
    private Boolean activeAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studant_id")
    private Studant studant;

    public Address() {
    }

    public Address(Address address){
        this.street = address.getStreet();
        this.neighborhood = address.getNeighborhood();
        this.houseNumber = address.getHouseNumber();
        this.city = address.getCity();
        this.zipCode = address.getZipCode();
        this.addressLead = address.getAddressLead();
        this.activeAddress = true;
    }

    public UUID getId() {
        return id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Boolean getAddressLead() {
        return addressLead;
    }

    public void setAddressLead(Boolean addressLead) {
        this.addressLead = addressLead;
    }

    public Boolean getActiveAddress() {
        return activeAddress;
    }

    public void setActiveAddress(Boolean activeAddress) {
        this.activeAddress = activeAddress;
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
        Address address = (Address) o;
        return Objects.equals(id, address.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Address mergeForUpdate(Address address){
        address.setStreet(address.getStreet());
        address.setNeighborhood(address.getNeighborhood());
        address.setHouseNumber(address.getHouseNumber());
        address.setCity(address.getCity());
        address.setZipCode(address.getZipCode());
        address.setAddressLead(address.getAddressLead());
        address.setActiveAddress(address.getActiveAddress());

        return this;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", street='" + street + '\'' +
                ", neighborhood='" + neighborhood + '\'' +
                ", houseNumber='" + houseNumber + '\'' +
                ", city='" + city + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", addressLead=" + addressLead +
                ", activeAddress=" + activeAddress +
                '}';
    }
}
