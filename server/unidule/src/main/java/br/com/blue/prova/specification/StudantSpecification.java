package br.com.blue.prova.specification;

import br.com.blue.prova.domain.Studant;
import br.com.blue.prova.specification.config.SpecificationDefault;
import br.com.blue.prova.util.StringValidator;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class StudantSpecification implements SpecificationDefault<Studant> {

    private Specification<Studant> nameStudant(String nameStudant){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("name"))),
                "%" + StringValidator.removeAcentoLower(nameStudant) + "%");
    }

    public Specification<Studant> filter(String search, String name){
        var builder = builder();

        Optional.ofNullable(search).map(s -> nameStudant(s)).ifPresent(builder::and);
        Optional.ofNullable(name).map(this::nameStudant).ifPresent(builder::and);

        return builder.build();
    }
}
