package br.com.blue.prova.specification;

import br.com.blue.prova.domain.Department;
import br.com.blue.prova.specification.config.SpecificationDefault;
import br.com.blue.prova.util.StringValidator;
import com.itextpdf.kernel.utils.CompareTool;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DepartmentSpecification implements SpecificationDefault<Department> {

    private Specification<Department> descriptionDepartment(String descriptionDepartment){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("description"))),
                "%" + StringValidator.removeAcentoLower(descriptionDepartment) + "%");
    }

    private Specification<Department> responsibleDepartment(String responsibleDepartment){
        return (root, query, cb) -> cb.like(cb.function("unaccent", String.class, cb.lower(root.get("responsible"))),
                "%" + StringValidator.removeAcentoLower(responsibleDepartment) + "%");
    }

    public Specification<Department> filter(String search, String description, String responsible){
        var builder = builder();

        Optional.ofNullable(search).map(s -> descriptionDepartment(s)
                .or(responsibleDepartment(s))).ifPresent(builder::and);
        Optional.ofNullable(description).map(this::descriptionDepartment).ifPresent(builder::and);
        Optional.ofNullable(responsible).map(this::responsibleDepartment).ifPresent(builder::and);

        return builder.build();
    }
}
