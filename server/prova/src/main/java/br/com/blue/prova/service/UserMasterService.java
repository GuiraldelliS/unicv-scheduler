package br.com.blue.prova.service;

import br.com.blue.prova.domain.Studant;
import br.com.blue.prova.domain.UserMaster;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.repository.StudantRepository;
import br.com.blue.prova.repository.UserMasterRepository;
import br.com.blue.prova.specification.UserMasterSpecification;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserMasterService {
    private final StudantRepository studantRepository;
    private final UserMasterRepository userMasterRepository;
    private final UserMasterSpecification userMasterSpecification;

    public UserMasterService(StudantRepository studantRepository, UserMasterRepository userMasterRepository, UserMasterSpecification userMasterSpecification) {
        this.studantRepository = studantRepository;
        this.userMasterRepository = userMasterRepository;
        this.userMasterSpecification = userMasterSpecification;
    }

    @Transactional(readOnly = true)
    public UserMaster findById(String userMasterId){
        return userMasterRepository.findById(userMasterId)
                .orElseThrow(() -> new RuntimeException("User not fund!"));
    }

    @Transactional(readOnly = true)
    public Page<UserMaster> findAll(String name, String email, String phone, PageableDTO pageable){
        return userMasterRepository.findAll(userMasterSpecification.filters(name, email, phone), pageable.getPageable());
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private UserMaster save(UserMaster userMaster){
        return userMasterRepository.save(userMaster);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public UserMaster create(UserMaster userMaster){

        if(userMasterRepository.checkExistUserMaster(userMaster.getId())){
            throw new RuntimeException("UserMaster exists!");
        }

        var saveUserMaster = this.save(new UserMaster(userMaster));

        studantRepository.save(new Studant(saveUserMaster));

        return saveUserMaster;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public UserMaster update(UserMaster userMaster){
        var restoredUser = this.findById(userMaster.getId());

        restoredUser.mergeForUpdate(userMaster);

        return this.save(restoredUser);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public UserMaster delete(UserMaster userMaster){
        var restoredUser = this.findById(userMaster.getId());

        restoredUser.setActiveUserMaster(false);

        return this.save(restoredUser);
    }
}
