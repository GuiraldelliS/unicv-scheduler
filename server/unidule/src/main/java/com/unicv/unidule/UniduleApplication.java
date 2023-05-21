package com.unicv.unidule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.net.InetAddress;

@SpringBootApplication
public class UniduleApplication {

    private static final Logger log = LoggerFactory.getLogger(UniduleApplication.class);

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(UniduleApplication.class);

        Environment env = app.run(args).getEnvironment();
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        String hostAddress = "localhost";

        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (Exception e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }

        log.info("""
                                                
                        :.......:::..::::..::....::........::::.......:::........::........:
                        \tApplication '{}' is running! Access URLs:
                        \tLocal: \t\t{}://localhost:{}
                        \tExternal: \t{}://{}:{}
                        \tProfile(s): {}
                        :.......:::..::::..::....::........::::.......:::........::........:""",
                env.getProperty("spring.application.name"),
                protocol,
                env.getProperty("server.port"),
                protocol,
                hostAddress,
                env.getProperty("server.port"),
                env.getActiveProfiles());
    }

}
