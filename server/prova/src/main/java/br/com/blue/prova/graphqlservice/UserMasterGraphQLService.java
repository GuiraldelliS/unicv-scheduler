package br.com.blue.prova.graphqlservice;

import br.com.blue.prova.annotation.GraphQLService;
import br.com.blue.prova.domain.UserMaster;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.service.UserMasterService;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Page;

@GraphQLService
public class UserMasterGraphQLService {
    private final UserMasterService userMasterService;

    public UserMasterGraphQLService(UserMasterService userMasterService) {
        this.userMasterService = userMasterService;
    }

    @GraphQLQuery
    public UserMaster findUserById(@GraphQLArgument(name = "userId")String userId){
        return userMasterService.findById(userId);
    }

    @GraphQLQuery
    public Page<UserMaster> findAllUser(@GraphQLArgument(name = "name")String name,
                                        @GraphQLArgument(name = "email")String email,
                                        @GraphQLArgument(name = "phone")String phone,
                                        @GraphQLArgument(name = "pageable") PageableDTO pageable){
        return userMasterService.findAll(name, email, phone, pageable);
    }

    @GraphQLMutation
    public UserMaster createUser(@GraphQLArgument(name = "userMaster") UserMaster userMaster){
        return userMasterService.create(userMaster);
    }

    @GraphQLMutation
    public UserMaster updateUser(@GraphQLArgument(name = "userMaster") UserMaster userMaster){
        return userMasterService.update(userMaster);
    }

    @GraphQLMutation
    public UserMaster deleteUser(@GraphQLArgument(name = "userMaster") UserMaster userMaster){
        return userMasterService.delete(userMaster);
    }

}
