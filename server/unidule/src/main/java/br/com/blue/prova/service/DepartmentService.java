package br.com.blue.prova.service;

import br.com.blue.prova.domain.Department;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.repository.DepartmentRepository;
import br.com.blue.prova.specification.DepartmentSpecification;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final DepartmentSpecification departmentSpecification;

    public DepartmentService(DepartmentRepository departmentRepository, DepartmentSpecification departmentSpecification) {
        this.departmentRepository = departmentRepository;
        this.departmentSpecification = departmentSpecification;
    }

    @Transactional(readOnly = true)
    public Department findById(UUID departmentId){
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found!"));
    }

    @Transactional(readOnly = true)
    public Page<Department> findAllDepartment(String search, String description,
                                              String responsible, PageableDTO pageableDTO){
        return departmentRepository.findAll(
                departmentSpecification.filter(search, description, responsible), pageableDTO.getPageable());
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private Department save(Department department){
        return departmentRepository.save(department);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Department create(Department department){
        return this.save(new Department(department));
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Department update(Department department){
        var restoredDepartment = this.findById(department.getId());

        restoredDepartment.mergeForUpdate(department);

        return this.save(restoredDepartment);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Department delete(Department department, Boolean activeDepartment){
        var restoredDepartment = this.findById(department.getId());

        restoredDepartment.setActiveDepartment(activeDepartment);

        return this.update(restoredDepartment);
    }
}
