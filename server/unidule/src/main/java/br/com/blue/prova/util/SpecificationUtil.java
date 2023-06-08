package br.com.blue.prova.util;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;

public class SpecificationUtil {
    private SpecificationUtil() {
    }

    public static Expression<String> prepareAtributeForLike(CriteriaBuilder cb, Path<String> atribute) {
        return cb.function("unaccent", String.class, cb.lower(atribute));
    }

    public static String prepareStringForLike(String s) {
        return "%" + StringValidator.removeAcentoLower(s) + "%";
    }
}