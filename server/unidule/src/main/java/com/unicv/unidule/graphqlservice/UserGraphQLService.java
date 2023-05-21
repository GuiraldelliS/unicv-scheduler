package com.unicv.unidule.graphqlservice;

import com.unicv.unidule.annotation.GraphQLService;
import com.unicv.unidule.domain.User;
import com.unicv.unidule.service.UserService;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;

@GraphQLService
public class UserGraphQLService {
    private final UserService userService;

    public UserGraphQLService(UserService userService) {
        this.userService = userService;
    }

    @GraphQLMutation
    public User createUser(@GraphQLArgument(name = "user") User user){
        return userService.create(user);
    }
}
