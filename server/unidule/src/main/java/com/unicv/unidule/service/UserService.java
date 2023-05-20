package com.unicv.unidule.service;

import com.unicv.unidule.domain.User;
import com.unicv.unidule.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public User create(User user){
        return userRepository.save(user);
    }
}
