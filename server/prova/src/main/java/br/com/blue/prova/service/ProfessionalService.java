package br.com.blue.prova.service;

import br.com.blue.prova.domain.Professional;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.repository.ProfessionalRepository;
import br.com.blue.prova.specification.ProfessionalSpecification;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ProfessionalService {
    private final ProfessionalRepository professionalRepository;
    private final ProfessionalSpecification professionalSpecification;

    public ProfessionalService(ProfessionalRepository professionalRepository, ProfessionalSpecification professionalSpecification) {
        this.professionalRepository = professionalRepository;
        this.professionalSpecification = professionalSpecification;
    }

    @Transactional(readOnly = true)
    public Professional findById(Long professionalId){
        return professionalRepository.findById(professionalId)
                .orElseThrow(() -> new RuntimeException("Professional not found!"));
    }

    @Transactional(readOnly = true)
    public Page<Professional> findAllProfessional(String search, String name, PageableDTO pageableDTO){
        return professionalRepository.findAll(professionalSpecification.filter(search, name),pageableDTO.getPageable());
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private Professional save(Professional professional){
        return professionalRepository.save(professional);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Professional create(Professional professional){
        return this.save(new Professional(professional));
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Professional update(Professional professional){
        var restoredProfessional = this.findById(professional.getId());

        restoredProfessional.mergeForUpdate(professional);

        return this.save(restoredProfessional);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Professional delete(Professional professional){
        var restoredProfessional = this.findById(professional.getId());

        restoredProfessional.setActiveProfessional(false);

        return this.update(restoredProfessional);
    }
}
