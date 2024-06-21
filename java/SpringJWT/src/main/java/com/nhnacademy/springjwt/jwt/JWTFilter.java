package com.nhnacademy.springjwt.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.nhnacademy.springjwt.dto.CustomUserDetails;
import com.nhnacademy.springjwt.entity.UserEntity;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
	private final JWTUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String authorization = request.getHeader("Authorization");

		// Authorization 헤더 검증
		if(authorization == null || !authorization.startsWith("Bearer ")){
			System.out.println("token is null");
			filterChain.doFilter(request, response);
			return;
		}

		String token = authorization.split(" ")[1];

		if(jwtUtils.isExpired(token)){
			System.out.println("token is expired");
			filterChain.doFilter(request, response);
			return;
		}

		String username = jwtUtils.getUsername(token);
		String role = jwtUtils.getRole(token);

		UserEntity userEntity = new UserEntity();
		userEntity.setUsername(username);
		userEntity.setPassword("tempPassword");
		userEntity.setRole(role);

		CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

		Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(authToken);

		filterChain.doFilter(request, response);
	}
}
