package br.com.blue.prova.config;

import liquibase.changelog.IncludeAllFilter;

public class ChangeLogFilter implements IncludeAllFilter {

    @Override
    public boolean include(String changeLogPath) {
        return !changeLogPath.endsWith("changeLog.prova.master.xml") && changeLogPath.endsWith(".xml");
    }
}
