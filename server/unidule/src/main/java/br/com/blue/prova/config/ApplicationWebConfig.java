package br.com.blue.prova.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.activation.FileTypeMap;
import javax.activation.MimetypesFileTypeMap;

@EnableAsync
@Configuration
public class ApplicationWebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/graphiql").setViewName(
                "forward:/graphiql/index.html");
    }

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:messages/messages");
        return messageSource;
    }

    @Bean
    public MimetypesFileTypeMap mimetypesFileTypeMap() {
        MimetypesFileTypeMap defaultFileTypeMap = (MimetypesFileTypeMap) FileTypeMap.getDefaultFileTypeMap();
        defaultFileTypeMap.addMimeTypes("application/pdf pdf");

        return defaultFileTypeMap;
    }
}
