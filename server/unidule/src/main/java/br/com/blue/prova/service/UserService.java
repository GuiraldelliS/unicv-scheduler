package br.com.blue.prova.service;

import br.com.blue.prova.domain.User;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.repository.UserRepository;
import br.com.blue.prova.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserSpecification userSpecification;

    public UserService(UserRepository userRepository, UserSpecification userSpecification) {
        this.userRepository = userRepository;
        this.userSpecification = userSpecification;
    }

    @Transactional(readOnly = true)
    public User findById(Long userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not fund!"));
    }

    @Transactional(readOnly = true)
    public Page<User> findAll(String name, String email, String phone, PageableDTO pageable){
        return userRepository.findAll(userSpecification.filters(name, email, phone), pageable.getPageable());
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private User save(User user){
        return userRepository.save(user);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User createUser(User usuario){
        return this.save(new User(usuario));
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User updateUser(User user){
        var restoredUser = this.findById(user.getId());

        restoredUser.mergeForUpdate(user);

        return this.save(restoredUser);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User deleteUser(User user){
        var restoredUser = this.findById(user.getId());

        restoredUser.setActiveUser(false);

        return this.save(restoredUser);
    }
}
