package com.nhnacademy.springjwt.jwt;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.nhnacademy.springjwt.entity.RefreshTokenEntity;
import com.nhnacademy.springjwt.repository.RefreshTokenRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager;
	private final JWTUtils jwtUtils;
	private final RefreshTokenRepository refreshTokenRepository;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws
		AuthenticationException {

		String username = obtainUsername(request);
		String password = obtainPassword(request);

		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password,
			null);

		return authenticationManager.authenticate(authToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authentication) throws IOException, ServletException {

		// 유저 정보
		String username = authentication.getName();
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
		GrantedAuthority auth = iterator.next();
		String role = auth.getAuthority();

		// 토큰 생성
		String access = jwtUtils.generateToken("access", username, role, 10 * 60 * 1000L);
		String refresh = jwtUtils.generateToken("refresh", username, role, 24 * 60 * 60 * 1000L);

		// Refresh Token 서버측 DB에 저장
		addRefreshTokenEntity(username, refresh, 24 * 60 * 60 * 1000L);

		// 응답 설정
		response.setHeader("access", access);
		response.addCookie(createCookie("refresh", refresh));
		response.setStatus(HttpStatus.OK.value());
	}

	private void addRefreshTokenEntity(String username, String refresh, Long expiredMs) {

		Date date = new Date(System.currentTimeMillis() + expiredMs);

		RefreshTokenEntity refreshTokenEntity = new RefreshTokenEntity();
		refreshTokenEntity.setUsername(username);
		refreshTokenEntity.setRefreshToken(refresh);
		refreshTokenEntity.setExpiresIn(date.toString());

		refreshTokenRepository.save(refreshTokenEntity);
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException failed) throws IOException, ServletException {
		response.setStatus(401);
	}

	private Cookie createCookie(String key, String value) {
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(24 * 60 * 60);
		// cookie.setSecure(true); // for https
		// cookie.setPath("/"); // 적용 범위
		cookie.setHttpOnly(true);

		return cookie;
	}
}

