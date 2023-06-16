package br.com.blue.prova.config;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Component
public class DataProvider {

    public ZonedDateTime getDataAtual() {
        return ZonedDateTime.now();
    }

    public LocalDateTime getLocalDataAtual() {
        return LocalDateTime.now();
    }

}
