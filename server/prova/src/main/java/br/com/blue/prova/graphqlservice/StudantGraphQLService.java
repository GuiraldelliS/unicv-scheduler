package br.com.blue.prova.graphqlservice;

import br.com.blue.prova.annotation.GraphQLService;
import br.com.blue.prova.domain.Studant;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.service.StudantService;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Page;

import static java.util.Objects.nonNull;

@GraphQLService
public class StudantGraphQLService {
    private final StudantService studantService;

    public StudantGraphQLService(StudantService studantService) {
        this.studantService = studantService;
    }

    @GraphQLQuery
    public Studant findStudantById(@GraphQLArgument(name = "studantId")Long studantId){
        return studantService.findById(studantId);
    }

    @GraphQLQuery
    public Page<Studant> findAllStudant(@GraphQLArgument(name = "search")String search,
                                        @GraphQLArgument(name = "name")String name,
                                        @GraphQLArgument(name = "pageableDTO")PageableDTO pageableDTO){
        return studantService.findAllStudant(search, name, pageableDTO);
    }

    @GraphQLQuery
    public Studant findStudantLogado(@GraphQLArgument(name = "userMasterId")String userMasterId){
        return studantService.findStudantLogado(userMasterId);
    }

    @GraphQLMutation
    public Studant createStudant(@GraphQLArgument(name = "studant")Studant studant){
        if(nonNull(studant.getId())){
            return studantService.update(studant);
        }
        return studantService.create(studant);
    }

    @GraphQLMutation
    public Studant updateStudant(@GraphQLArgument(name = "studant")Studant studant){
        return studantService.update(studant);
    }

    @GraphQLMutation
    public Studant deleteStudant(@GraphQLArgument(name = "studant")Studant studant){
        return studantService.delete(studant);
    }
}
