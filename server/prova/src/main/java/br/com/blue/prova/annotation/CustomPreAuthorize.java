package br.com.blue.prova.annotation;

import br.com.blue.prova.config.security.cliente.OperacaoAuthority;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(value = CustomPreAuthorizes.class)
public @interface CustomPreAuthorize {
    Class<?> entidade();

    OperacaoAuthority[] operacoes() default {};

    String[] operacoesString() default {};

}
