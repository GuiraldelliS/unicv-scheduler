package br.com.blue.prova.service;

import br.com.blue.prova.domain.Studant;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.repository.StudantRepository;
import br.com.blue.prova.specification.StudantSpecification;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudantService {
    private final AddressService addressService;
    private final StudantRepository studantRepository;
    private final StudantSpecification studantSpecification;

    public StudantService(AddressService addressService, StudantRepository studantRepository, StudantSpecification studantSpecification) {
        this.addressService = addressService;
        this.studantRepository = studantRepository;
        this.studantSpecification = studantSpecification;
    }

    @Transactional(readOnly = true)
    public Studant findById(Long studantId) {
        return studantRepository.findById(studantId)
                .orElseThrow(() -> new RuntimeException("studant not found!"));
    }

    @Transactional(readOnly = true)
    public Page<Studant> findAllStudant(String search, String name, PageableDTO pageableDTO) {
        return studantRepository.findAll(studantSpecification.filter(search, name), pageableDTO.getPageable());
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private Studant save(Studant studant) {
        return studantRepository.save(studant);
    }

    @Transactional(readOnly = true)
    public Studant findStudantLogado(String userMasterId){
        return studantRepository.findStudantLogado(userMasterId)
                .orElseThrow(() -> new RuntimeException("Student not found!"));
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Studant create(Studant studant) {
        var saveStudant = this.save(new Studant(studant));

        saveStudant.getAddress().stream()
                .peek(address -> address.setStudant(saveStudant))
                .forEach(addressService::create);

        return this.update(saveStudant);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Studant update(Studant studant) {
        var restoredStudant = this.findById(studant.getId());

        restoredStudant.mergeForUpdate(studant);

        return this.save(restoredStudant);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Studant delete(Studant studant) {
        var restoredStudant = this.findById(studant.getId());

        restoredStudant.setActiveStudant(false);

        return this.update(restoredStudant);
    }
}
