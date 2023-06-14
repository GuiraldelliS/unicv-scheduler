package br.com.blue.prova.graphqlservice;

import br.com.blue.prova.annotation.GraphQLService;
import br.com.blue.prova.domain.Professional;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.service.ProfessionalService;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Page;

import static java.util.Objects.*;

@GraphQLService
public class ProfessionalGraphQLService {
    private final ProfessionalService professionalService;

    public ProfessionalGraphQLService(ProfessionalService professionalService) {
        this.professionalService = professionalService;
    }

    @GraphQLQuery
    public Professional findProfessionalById(@GraphQLArgument(name = "professionalId")Long professionalId){
        return professionalService.findById(professionalId);
    }

    @GraphQLQuery
    public Page<Professional> findAllProfessional(@GraphQLArgument(name = "search")String search,
                                                  @GraphQLArgument(name = "name")String name,
                                                  @GraphQLArgument(name = "pageableDTO")PageableDTO pageableDTO){
        return professionalService.findAllProfessional(search, name, pageableDTO);
    }

    @GraphQLMutation
    public Professional createProfessional(@GraphQLArgument(name = "professional")Professional professional){
        if(nonNull(professional.getId())){
            return professionalService.update(professional);
        }
        return professionalService.create(professional);
    }

    @GraphQLMutation
    public Professional updateProfessional(@GraphQLArgument(name = "professional")Professional professional){
        return professionalService.update(professional);
    }

    @GraphQLMutation
    public Professional deleteProfessional(@GraphQLArgument(name = "professional")Professional professional){
        return professionalService.delete(professional);
    }
}
