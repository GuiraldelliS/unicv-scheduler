package br.com.blue.prova.config;

import graphql.ExceptionWhileDataFetching;
import graphql.GraphQLError;
import graphql.execution.DataFetcherExceptionHandler;
import graphql.execution.DataFetcherExceptionHandlerParameters;
import graphql.execution.DataFetcherExceptionHandlerResult;
import graphql.execution.ResultPath;
import graphql.language.SourceLocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The standard handling of data fetcher error involves placing a {@link ProvaBusinessException} error
 * into the error collection
 */
public class CustomDataFetcherExceptionHandler implements DataFetcherExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(CustomDataFetcherExceptionHandler.class);

    @Override
    public DataFetcherExceptionHandlerResult onException(DataFetcherExceptionHandlerParameters handlerParameters) {
        Throwable exception = handlerParameters.getException();
        SourceLocation sourceLocation = handlerParameters.getSourceLocation();
        ResultPath path = handlerParameters.getPath();

        GraphQLError error;

        if (exception instanceof ProvaBusinessException) {
            error = new ProvaBusinessException(path, exception.getMessage(), sourceLocation);
        } else {
            error = new ExceptionWhileDataFetching(path, exception, sourceLocation);
        }

        log.warn(error.getMessage(), exception);

        return DataFetcherExceptionHandlerResult.newResult().error(error).build();
    }
}
