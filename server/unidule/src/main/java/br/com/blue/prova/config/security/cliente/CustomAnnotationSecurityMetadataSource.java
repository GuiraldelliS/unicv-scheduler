package br.com.blue.prova.config.security.cliente;

import br.com.blue.prova.annotation.CustomPreAuthorize;
import br.com.blue.prova.annotation.CustomPreAuthorizes;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.method.AbstractMethodSecurityMetadataSource;
import org.springframework.security.access.prepost.PreInvocationAttribute;
import org.springframework.security.access.prepost.PrePostInvocationAttributeFactory;
import org.springframework.util.ClassUtils;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class CustomAnnotationSecurityMetadataSource extends AbstractMethodSecurityMetadataSource {

    public static final String SEPARADOR_ROLES = "_";
    private final PrePostInvocationAttributeFactory attributeFactory;

    public CustomAnnotationSecurityMetadataSource(
            PrePostInvocationAttributeFactory attributeFactory) {
        this.attributeFactory = attributeFactory;
    }

    public Collection<ConfigAttribute> getAttributes(Method method, Class<?> targetClass) {
        if (method.getDeclaringClass() == Object.class) {
            return Collections.emptyList();
        }

        logger.trace("Looking for custom Pre/Post annotations for method '" + method.getName()
                + "' on target class '" + targetClass + "'");
        CustomPreAuthorize preAuthorize = findAnnotation(method, targetClass, CustomPreAuthorize.class);
        CustomPreAuthorizes preAuthorizes = findAnnotation(method, targetClass, CustomPreAuthorizes.class);

        if (preAuthorize == null && preAuthorizes == null) {
            // There is no meta-data so return
            logger.trace("No expression annotations found");
            return Collections.emptyList();
        }

        StringBuilder roles = new StringBuilder();


        if (preAuthorize != null) {
            roles.append(processaPreAuthorizes(preAuthorize));
        }

        if (preAuthorizes != null) {
            List<String> rolesCustomPreAuthorize = new ArrayList<>();
            for (CustomPreAuthorize customPreAuthorize : preAuthorizes.value()) {
                rolesCustomPreAuthorize.add(processaPreAuthorizes(customPreAuthorize));
            }

            roles.append(rolesCustomPreAuthorize.stream().reduce((role, role2) -> role + ", " + role2).orElse(""));
        }

        if ("".contentEquals(roles)) {
            logger.error("CustomPreAuthorize não deve ser usado sem ao menos uma operacao ou operacaoString");
            return Collections.emptyList();
        }

        String preAuthorizeAttribute = "hasAnyRole(" + roles + ")";
        ArrayList<ConfigAttribute> attrs = new ArrayList<>(1);

        PreInvocationAttribute pre = attributeFactory.createPreInvocationAttribute(
                null, null, preAuthorizeAttribute);

        if (pre != null) {
            attrs.add(pre);
        }

        attrs.trimToSize();

        return attrs;
    }

    private String processaPreAuthorizes(CustomPreAuthorize preAuthorize) {
        String nomeRoleEntidade = getNomeRoleEntidade(preAuthorize);

        return montaRoles(preAuthorize, nomeRoleEntidade);
    }

    private String getNomeRoleEntidade(CustomPreAuthorize preAuthorize) {
        return trocaCamelCasePorSnake(preAuthorize.entidade().getSimpleName());
    }

    private String trocaCamelCasePorSnake(String nome) {
        return nome
                .replaceAll("[^a-zA-Z0-9]+", "_")
                .replaceAll("([A-Z]+)([A-Z][a-z])", "$1_$2")
                .replaceAll("([a-z])([A-Z])", "$1_$2")
                .replaceAll("([0-9])([^0-9])", "$1_$2")
                .replaceAll("([^0-9])([0-9])", "$1_$2")
                .replaceAll("_+", "_")
                .toUpperCase();
    }

    private String montaRoles(CustomPreAuthorize preAuthorize, String nomeRoleEntidade) {
        List<String> roles = montaRolesOperacoes(nomeRoleEntidade, preAuthorize.operacoes());
        roles.addAll(montaRolesOperacoesString(nomeRoleEntidade, preAuthorize.operacoesString()));

        return roles.stream().reduce((role, role2) -> role + ", " + role2).orElse("");
    }

    private List<String> montaRolesOperacoes(String nomeRoleEntidade, OperacaoAuthority[] operacoes) {
        List<String> roles = new ArrayList<>(operacoes.length);

        for (OperacaoAuthority operacao : operacoes) {
            String operacaoString = operacao.toString();
            roles.add(montaRole(nomeRoleEntidade, operacaoString));
        }

        return roles;
    }

    private List<String> montaRolesOperacoesString(String nomeRoleEntidade, String[] operacoesString) {
        List<String> roles = new ArrayList<>(operacoesString.length);

        for (String operacao : operacoesString) {
            roles.add(montaRole(nomeRoleEntidade, operacao));
        }

        return roles;
    }

    private String montaRole(String nomeRoleEntidade, String operacao) {
        return "'" + nomeRoleEntidade + SEPARADOR_ROLES + operacao + "'";
    }

    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    /**
     * See
     * {@link org.springframework.security.access.method.AbstractFallbackMethodSecurityMetadataSource#getAttributes(Method, Class)}
     * for the logic of this method. The ordering here is slightly different in that we
     * consider method-specific annotations on an interface before class-level ones.
     */
    private <A extends Annotation> A findAnnotation(Method method, Class<?> targetClass,
                                                    Class<A> annotationClass) {
        // The method may be on an interface, but we need attributes from the target
        // class.
        // If the target class is null, the method will be unchanged.
        Method specificMethod = ClassUtils.getMostSpecificMethod(method, targetClass);
        A annotation = AnnotationUtils.findAnnotation(specificMethod, annotationClass);

        if (annotation != null) {
            logger.debug(annotation + " found on specific method: " + specificMethod);
            return annotation;
        }

        // Check the original (e.g. interface) method
        if (specificMethod != method) {
            annotation = AnnotationUtils.findAnnotation(method, annotationClass);

            if (annotation != null) {
                logger.debug(annotation + " found on: " + method);
                return annotation;
            }
        }

        // Check the class-level (note declaringClass, not targetClass, which may not
        // actually implement the method)
        annotation = AnnotationUtils.findAnnotation(specificMethod.getDeclaringClass(),
                annotationClass);

        if (annotation != null) {
            logger.debug(annotation + " found on: "
                    + specificMethod.getDeclaringClass().getName());
            return annotation;
        }

        return null;
    }

}
