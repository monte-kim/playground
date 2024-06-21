package com.nhnacademy.springjwt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nhnacademy.springjwt.Service.UserService;
import com.nhnacademy.springjwt.dto.SignUpDto;

import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;

	@PostMapping("/sign-up")
	public String signUp(@RequestBody SignUpDto signUpDto) {
		userService.createUser(signUpDto);
		return "ok";
	}
}
