package br.com.blue.prova.config.security.cliente;

import br.com.blue.prova.config.properties.ApplicationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.ExpressionBasedAnnotationAttributeFactory;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.access.method.MethodSecurityMetadataSource;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class GlobalMethodSecurityConfig extends GlobalMethodSecurityConfiguration {

    private final ApplicationProperties applicationProperties;

    @Autowired
    public GlobalMethodSecurityConfig(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @Override
    protected MethodSecurityExpressionHandler createExpressionHandler() {
        return new CustomOAuth2MethodSecurityExpressionHandler();
    }

    @Override
    protected MethodSecurityMetadataSource customMethodSecurityMetadataSource() {
        if (applicationProperties.isExigirAutorizacao()) {
            ExpressionBasedAnnotationAttributeFactory attributeFactory = new ExpressionBasedAnnotationAttributeFactory(getExpressionHandler());
            return new CustomAnnotationSecurityMetadataSource(attributeFactory);
        }

        return null;
    }
}
