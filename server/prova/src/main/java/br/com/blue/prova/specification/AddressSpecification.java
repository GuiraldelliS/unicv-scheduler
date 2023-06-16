package br.com.blue.prova.specification;

import br.com.blue.prova.domain.Address;
import br.com.blue.prova.specification.config.SpecificationDefault;
import br.com.blue.prova.util.StringValidator;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AddressSpecification implements SpecificationDefault<Address> {

    private Specification<Address> streetAddress(String streetAddress){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("street"))),
                "%" + StringValidator.removeAcentoLower(streetAddress) + "%");
    }

    private Specification<Address> neighborhoodAddress(String neighborhoodAddress){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("neighborhood"))),
                "%" + StringValidator.removeAcentoLower(neighborhoodAddress) + "%");
    }

    private Specification<Address> houseNumberAddress(String houseNumberAddress){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("houseNumber"))),
                "%" + StringValidator.removeAcentoLower(houseNumberAddress) + "%");
    }

    private Specification<Address> cityAddress(String cityAddress){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("city"))),
                "%" + StringValidator.removeAcentoLower(cityAddress) + "%");
    }

    private Specification<Address> zipCodeAddress(String zipCodeAddress){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("zipCode"))),
                "%" + StringValidator.removeAcentoLower(zipCodeAddress) + "%");
    }

    private Specification<Address> addressLeadAddress(Boolean addressLeadAddress){
        return (root, query, cb) -> cb.equal(root.get("addressLead"), addressLeadAddress);
    }

    public Specification<Address> filter(String search, String street,
                                         String neighborhood, String houseNumber,
                                         String city, String zipCode,
                                         Boolean addressLead){
        var builder = builder();


        Optional.ofNullable(search).map(s -> streetAddress(s).or(neighborhoodAddress(s)
                .or(houseNumberAddress(s).or(cityAddress(s)
                        .or(zipCodeAddress(s)))))
        );
        Optional.ofNullable(street).map(this::streetAddress).ifPresent(builder::and);
        Optional.ofNullable(neighborhood).map(this::neighborhoodAddress).ifPresent(builder::and);
        Optional.ofNullable(houseNumber).map(this::houseNumberAddress).ifPresent(builder::and);
        Optional.ofNullable(city).map(this::cityAddress).ifPresent(builder::and);
        Optional.ofNullable(zipCode).map(this::zipCodeAddress).ifPresent(builder::and);
        Optional.ofNullable(addressLead).map(this::addressLeadAddress).ifPresent(builder::and);


        return builder.build();
    }


}
