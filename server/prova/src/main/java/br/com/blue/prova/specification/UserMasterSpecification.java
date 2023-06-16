package br.com.blue.prova.specification;

import br.com.blue.prova.domain.UserMaster;
import br.com.blue.prova.specification.config.SpecificationDefault;
import br.com.blue.prova.util.StringValidator;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserMasterSpecification implements SpecificationDefault<UserMaster> {

    private Specification<UserMaster> nameUserMaster(String nameUserMaster) {
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("name"))),
                "%" + StringValidator.removeAcentoLower(nameUserMaster) + "%");
    }

    private Specification<UserMaster> emailUserMaster(String emailUserMaster){
        return (root, query, cb) -> cb.equal(root.get("email"),emailUserMaster);
    }

    private Specification<UserMaster> phoneUserMaster(String phoneUserMaster){
        return (root, query, cb) -> cb.equal(root.get("phone"),phoneUserMaster);
    }

    public Specification<UserMaster> filters(String name, String email, String phone){
        var builder = builder();

        Optional.ofNullable(name).map(this::nameUserMaster).ifPresent(builder::and);
        Optional.ofNullable(email).map(this::emailUserMaster).ifPresent(builder::and);
        Optional.ofNullable(phone).map(this::phoneUserMaster).ifPresent(builder::and);

        return builder.build();
    }
}
