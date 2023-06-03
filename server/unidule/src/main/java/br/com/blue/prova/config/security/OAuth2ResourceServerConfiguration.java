package br.com.blue.prova.config.security;

import br.com.blue.prova.config.properties.ApplicationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.AccessTokenConverter;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

import javax.sql.DataSource;

/**
 * Configuração do servidor de recursos OAuth2 para que todos os serviços REST
 * tenham que passar por autenticação. Configura o {@code TokenStore} do
 * servidor de recursos para utilizar o mesmo do servidor de autenticação.
 */
@Configuration
@EnableResourceServer
public class OAuth2ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

    private final DataSource dataSource;

    private final ApplicationProperties applicationProperties;

    @Autowired
    public OAuth2ResourceServerConfiguration(DataSource dataSource, ApplicationProperties applicationProperties) {
        this.dataSource = dataSource;
        this.applicationProperties = applicationProperties;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        if (applicationProperties.isExigirAutenticacao()) {
            http.authorizeRequests()
                    .antMatchers("/api/**").access("#oauth2.hasScope('api')")
                    .antMatchers("/public/**").permitAll()
                    .antMatchers("/graphiql/**").permitAll()
                    .anyRequest().denyAll();
        } else {
            http.authorizeRequests().anyRequest().permitAll();
        }
    }

    @Bean
    public AccessTokenConverter accessTokenConverter() {
        return new DefaultAccessTokenConverter();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.tokenStore(new JdbcTokenStore(dataSource));
    }
}
