package br.com.blue.prova.config.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


/**
 * Fachada para dados de autenticação do usuário.
 */
@Component
public class ProvaAuthentication {

    private Authentication getAuthentication() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            throw new NotAuthenticatedException("User not authenticated!");
        }

        return authentication;
    }

}
