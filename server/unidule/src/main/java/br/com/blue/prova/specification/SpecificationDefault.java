package br.com.blue.prova.specification;

import org.springframework.data.jpa.domain.Specification;

import java.io.Serializable;
import java.util.Collection;
import java.util.UUID;

import static br.com.blue.prova.util.SpecificationUtil.prepareAtributeForLike;
import static br.com.blue.prova.util.SpecificationUtil.prepareStringForLike;

public interface SpecificationDefault<T extends Serializable> {

    default Specification<T> id(Long id) {
        return (root, query, cb) -> cb.equal(root.get("id"), id);
    }

    default Specification<T> id(UUID id) {
        return (root, query, cb) -> cb.equal(root.get("id"), id);
    }

    default Specification<T> id(Collection<UUID> id) {
        return (root, query, cb) -> root.get("id").in(id);
    }

    default Specification<T> isAtivo(Boolean ativo) {
        return (root, query, cb) -> cb.equal(root.get("ativo"), ativo);
    }

    default Specification<T> like(String field, String search) {
        return (root, query, cb) -> cb.like(prepareAtributeForLike(cb, root.get(field)), prepareStringForLike(search));
    }

    default SpecificationBuilder<T> builder() {
        return new SpecificationBuilder<>();
    }
}
