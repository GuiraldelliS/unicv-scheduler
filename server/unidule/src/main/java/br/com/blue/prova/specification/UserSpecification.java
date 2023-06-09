package br.com.blue.prova.specification;

import br.com.blue.prova.domain.User;
import br.com.blue.prova.specification.config.SpecificationDefault;
import br.com.blue.prova.util.StringValidator;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserSpecification implements SpecificationDefault<User> {

    private Specification<User> nameUser(String nameUser) {
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("name"))),
                "%" + StringValidator.removeAcentoLower(nameUser) + "%");
    }

    private Specification<User> emailUser(String emailUser){
        return (root, query, cb) -> cb.equal(root.get("email"),emailUser);
    }

    private Specification<User> phoneUser(String phoneUser){
        return (root, query, cb) -> cb.equal(root.get("phone"),phoneUser);
    }

    public Specification<User> filters(String nameUser, String emailUser, String phoneUser){
        var builder = builder();

        Optional.ofNullable(nameUser).map(this::nameUser).ifPresent(builder::and);
        Optional.ofNullable(emailUser).map(this::emailUser).ifPresent(builder::and);
        Optional.ofNullable(phoneUser).map(this::phoneUser).ifPresent(builder::and);

        return builder.build();
    }
}
