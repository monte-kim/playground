package com.nhnacademy.springjwt.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nhnacademy.springjwt.dto.SignUpDto;
import com.nhnacademy.springjwt.entity.UserEntity;
import com.nhnacademy.springjwt.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public void createUser(SignUpDto signUpDto){
		String username = signUpDto.getUsername();
		String password = signUpDto.getPassword();

		Boolean isExist = userRepository.existsByUsername(username);
		if(isExist){
			return;
		}

		UserEntity data = new UserEntity();
		data.setUsername(username);
		data.setPassword(passwordEncoder.encode(password));
		data.setRole("ROLE_ADMIN");

		userRepository.save(data);
	}
}
