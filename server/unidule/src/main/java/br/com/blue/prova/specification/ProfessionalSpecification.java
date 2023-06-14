package br.com.blue.prova.specification;

import br.com.blue.prova.domain.Professional;
import br.com.blue.prova.specification.config.SpecificationDefault;
import br.com.blue.prova.util.StringValidator;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ProfessionalSpecification implements SpecificationDefault<Professional> {

    private Specification<Professional> nameProfessional(String nameProfessional){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("name"))),
                "%" + StringValidator.removeAcentoLower(nameProfessional) + "%");
    }

    public Specification<Professional> filter(String search, String name){
        var builder = builder();

        Optional.ofNullable(search).map(s -> nameProfessional(s)).ifPresent(builder::and);
        Optional.ofNullable(name).map(this::nameProfessional).ifPresent(builder::and);

        return builder.build();
    }
}
