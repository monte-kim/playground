package com.nhnacademy.springjwt.controller;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhnacademy.springjwt.entity.RefreshTokenEntity;
import com.nhnacademy.springjwt.jwt.JWTUtils;
import com.nhnacademy.springjwt.repository.RefreshTokenRepository;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController // == @Controller + @ResponseBody
@RequiredArgsConstructor
public class ReissueController {
	private final JWTUtils jwtUtils;
	private final RefreshTokenRepository refreshTokenRepository;

	@PostMapping("/reissue")
	public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

		//get refresh token
		String refresh = null;
		Cookie[] cookies = request.getCookies();
		for (Cookie cookie : cookies) {

			if (cookie.getName().equals("refresh")) {

				refresh = cookie.getValue();
			}
		}

		if (refresh == null) {

			//response status code
			return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
		}

		//expired check
		try {
			jwtUtils.isExpired(refresh);
		} catch (ExpiredJwtException e) {

			//response status code
			return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
		}

		// 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
		String category = jwtUtils.getCategory(refresh);
		if (!category.equals("refresh")) {

			//response status code
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}

		//DB에 저장되어 있는지 확인
		Boolean isExist = refreshTokenRepository.existsByRefreshToken(refresh);
		if (!isExist) {
			//response body
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}

		String username = jwtUtils.getUsername(refresh);
		String role = jwtUtils.getRole(refresh);

		//make new JWT
		String newAccess = jwtUtils.generateToken("access", username, role, 10 * 60 * 1000L);
		String newRefresh = jwtUtils.generateToken("refresh", username, role, 24 * 60 * 60 * 1000L);

		// Refresh Token rotate
		refreshTokenRepository.deleteByRefreshToken(refresh);
		addRefreshTokenEntity(username, newRefresh, 24 * 60 * 60 * 1000L);

		//response
		response.setHeader("access", newAccess);
		response.addCookie(createCookie("refresh", newRefresh));

		return new ResponseEntity<>(HttpStatus.OK);
	}

	private Cookie createCookie(String key, String value) {
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(24 * 60 * 60);
		// cookie.setSecure(true); // for https
		// cookie.setPath("/"); // 적용 범위
		cookie.setHttpOnly(true);

		return cookie;
	}

	private void addRefreshTokenEntity(String username, String refresh, Long expiresIn) {

		Date date = new Date(System.currentTimeMillis() + expiresIn);

		RefreshTokenEntity refreshTokenEntity = new RefreshTokenEntity();
		refreshTokenEntity.setUsername(username);
		refreshTokenEntity.setRefreshToken(refresh);
		refreshTokenEntity.setExpiresIn(date.toString());

		refreshTokenRepository.save(refreshTokenEntity);
	}
}
