package br.com.blue.prova.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.validation.constraints.NotBlank;

/**
 * Properties specific to Application.
 * <p>
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    @NotBlank
    private boolean exigirAutenticacao;

    @NotBlank
    private boolean exigirAutorizacao;

    public boolean isExigirAutenticacao() {
        return exigirAutenticacao;
    }

    public void setExigirAutenticacao(boolean exigirAutenticacao) {
        this.exigirAutenticacao = exigirAutenticacao;
    }

    public boolean isExigirAutorizacao() {
        return exigirAutorizacao;
    }

    public void setExigirAutorizacao(boolean exigirAutorizacao) {
        this.exigirAutorizacao = exigirAutorizacao;
    }
}
