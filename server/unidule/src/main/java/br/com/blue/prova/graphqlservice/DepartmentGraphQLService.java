package br.com.blue.prova.graphqlservice;

import br.com.blue.prova.annotation.GraphQLService;
import br.com.blue.prova.domain.Department;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.service.DepartmentService;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.data.domain.Page;

import java.util.UUID;

import static java.util.Objects.*;


@GraphQLService
public class DepartmentGraphQLService {
    private final DepartmentService departmentService;

    public DepartmentGraphQLService(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GraphQLQuery
    public Department findDepartmentById(@GraphQLArgument(name = "departmentId") UUID departmentId){
        return departmentService.findById(departmentId);
    }

    @GraphQLQuery
    public Page<Department> findAllDepartment(@GraphQLArgument(name = "search")String search,
                                              @GraphQLArgument(name = "description")String description,
                                              @GraphQLArgument(name = "responsible")String responsible,
                                              @GraphQLArgument(name = "pageableDTO")PageableDTO pageableDTO){
        return departmentService.findAllDepartment(search, description, responsible, pageableDTO);
    }

    @GraphQLMutation
    public Department createDepartment(@GraphQLArgument(name = "department")Department department){
        if(nonNull(department.getId())){
            return departmentService.update(department);
        }
        return departmentService.create(department);
    }

    @GraphQLQuery
    public Department updateDepartment(@GraphQLArgument(name = "department")Department department){
        return departmentService.update(department);
    }

    @GraphQLMutation
    public Department deleteDepartment(@GraphQLArgument(name = "department")Department department){
        return departmentService.delete(department, false);
    }
}
