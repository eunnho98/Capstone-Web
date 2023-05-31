package com.example.yokhu;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public void signup(UserDto userDto){
        User user = new User();
        user.setRequestFields(
                userDto.getEmail(),
                userDto.getNickname(),
                userDto.getUsername());

        userRepository.save(user); //디비 저장

    }

    @Transactional
    public void withdraw(String username) throws Exception {

        User user = userRepository.findByUsername(username).orElseThrow(Exception::new);

        user.removeUserInformation();
    }
}
