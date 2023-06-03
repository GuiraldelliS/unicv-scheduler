package br.com.blue.prova.controller;

import br.com.blue.prova.annotation.GraphQLService;
import br.com.blue.prova.config.CustomDataFetcherExceptionHandler;
import br.com.blue.prova.dto.GraphQLRequestDTO;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.execution.AsyncExecutionStrategy;
import graphql.execution.AsyncSerialExecutionStrategy;
import graphql.execution.SubscriptionExecutionStrategy;
import graphql.schema.GraphQLSchema;
import io.leangen.graphql.GraphQLSchemaGenerator;
import io.leangen.graphql.metadata.strategy.query.AnnotatedResolverBuilder;
import io.leangen.graphql.metadata.strategy.value.jackson.JacksonValueMapperFactory;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static graphql.ExecutionInput.newExecutionInput;

@RestController
@RequestMapping("/api/v1/graphql")
public class GraphQLController {

    private final GraphQL graphQL;

    @Autowired
    public GraphQLController(ApplicationContext context) {
        LoggerFactory.getLogger(this.getClass()).debug("Inicializando endpoint do Graphql");

        this.graphQL = getGraphqlInstance(context.getBeansWithAnnotation(GraphQLService.class).values().toArray());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> search(@RequestBody GraphQLRequestDTO requestBody, GraphQLRequestDTO requestParams, HttpServletRequest raw) {

        var variablesParams = Optional.ofNullable(requestParams.getVariables());
        var variablesBody = Optional.ofNullable(requestBody.getVariables());

        String query = Optional.ofNullable(requestParams.getQuery())
                .orElse(requestBody.getQuery());
        String operationName = Optional.ofNullable(requestParams.getOperationName())
                .orElse(requestBody.getOperationName());

        Map<String, Object> variables = variablesParams.or(() -> variablesBody)
                .orElse(new HashMap<>());

        preencheIpAddress(raw, variables);

        var build = newExecutionInput()
                .query(query)
                .operationName(operationName)
                .variables(variables)
                .context(raw)
                .build();

        ExecutionResult executionResult = graphQL.execute(
                build
        );

        return executionResult.toSpecification();
    }

    public GraphQL getGraphqlInstance(Object... graphQLServices) {
        GraphQLSchema schema = new GraphQLSchemaGenerator()
                .withResolverBuilders(new AnnotatedResolverBuilder())
                .withOperationsFromSingletons(graphQLServices)
                .withValueMapperFactory(new JacksonValueMapperFactory())

                .generate();

        return GraphQL.newGraphQL(schema)
                .queryExecutionStrategy(new AsyncExecutionStrategy(new CustomDataFetcherExceptionHandler()))
                .mutationExecutionStrategy(new AsyncSerialExecutionStrategy(new CustomDataFetcherExceptionHandler()))
                .subscriptionExecutionStrategy(new SubscriptionExecutionStrategy(new CustomDataFetcherExceptionHandler()))
                .build();
    }

    private void preencheIpAddress(HttpServletRequest raw, Map<String, Object> variables) {
        var remoteAddr = raw.getRemoteAddr();

        if (remoteAddr.equals("0:0:0:0:0:0:0:1")) {
            remoteAddr = "192.168.1.192";
        }

        variables.put("ipAddress", remoteAddr);
    }
}
