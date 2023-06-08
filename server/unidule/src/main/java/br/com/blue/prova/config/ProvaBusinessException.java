package br.com.blue.prova.config;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.execution.ResultPath;
import graphql.language.SourceLocation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static graphql.Assert.assertNotNull;

public class ProvaBusinessException extends RuntimeException implements GraphQLError {

    private List<Object> path = new ArrayList<>();
    private List<SourceLocation> locations = new ArrayList<>();


    public ProvaBusinessException(ResultPath path, String message, SourceLocation sourceLocation) {
        this(message);

        this.path = assertNotNull(path).toList();
        this.locations = Collections.singletonList(sourceLocation);
    }

    public ProvaBusinessException() {
        super();
    }

    public ProvaBusinessException(String message) {
        super(message);
    }

    public ProvaBusinessException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProvaBusinessException(Throwable cause) {
        super(cause);
    }

    protected ProvaBusinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    @Override
    public List<SourceLocation> getLocations() {
        return locations;
    }

    @Override
    public ErrorType getErrorType() {
        return null;
    }

    @Override
    public List<Object> getPath() {
        return path;
    }
}
