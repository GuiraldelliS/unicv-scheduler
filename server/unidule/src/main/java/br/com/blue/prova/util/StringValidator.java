package br.com.blue.prova.util;

import java.text.Normalizer;

public class StringValidator {

    private StringValidator() {
    }

    public static String removeAcentoLower(String string) {
        return removeAcento(string).toLowerCase();
    }

    private static String removeAcento(String string) {
        return Normalizer.normalize(string.trim(), Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
    }
}
