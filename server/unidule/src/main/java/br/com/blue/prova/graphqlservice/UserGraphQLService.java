package br.com.blue.prova.graphqlservice;

import br.com.blue.prova.annotation.GraphQLService;
import br.com.blue.prova.domain.User;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.service.UserService;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Page;

import static java.util.Objects.*;

@GraphQLService
public class UserGraphQLService {
    private final UserService userService;

    public UserGraphQLService(UserService userService) {
        this.userService = userService;
    }

    @GraphQLQuery
    public User findUserById(@GraphQLArgument(name = "userId")Long userId){
        return userService.findById(userId);
    }

    @GraphQLQuery
    public Page<User> findAllUser(@GraphQLArgument(name = "name")String name,
                                  @GraphQLArgument(name = "email")String email,
                                  @GraphQLArgument(name = "phone")String phone,
                                  @GraphQLArgument(name = "pageable") PageableDTO pageable){
        return userService.findAll(name, email, phone, pageable);
    }

    @GraphQLMutation
    public User createUser(@GraphQLArgument(name = "usuario")User usuario){
        return userService.createUser(usuario);
    }

    @GraphQLMutation
    public User updateUser(@GraphQLArgument(name = "user")User user){
        return userService.updateUser(user);
    }

    @GraphQLMutation
    public User deleteUser(@GraphQLArgument(name = "user")User user){
        return userService.deleteUser(user);
    }

}
