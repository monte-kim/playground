package hello.login.web.filter;

import hello.login.web.SessionConst;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;

@Slf4j
@Component
public class LoginCheckFilter implements Filter {

  private static final String[] whitelist = {"/", "/members/add", "/login", "/logout", "/css/*"};

  @Override
  public void doFilter(
      ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
      throws IOException, ServletException {

    HttpServletRequest request = (HttpServletRequest) servletRequest;
    String requestURI = request.getRequestURI();

    HttpServletResponse response = (HttpServletResponse) servletResponse;

    try {
      log.info("인증 체크 필터 시작: {}", requestURI);

      if (isLoginCheckPath(requestURI)) {
        log.info("인증 체크 로직 실행: {}", requestURI);
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute(SessionConst.LOGIN_MEMBER) == null) {
          log.info("미인증 사용자 요청: {}", requestURI);
          response.sendRedirect("/login?redirectURL=" + requestURI);
          return;
        }
      }

      filterChain.doFilter(servletRequest, servletResponse);
    } catch (Exception e) {
      throw e;
    } finally {
      log.info("인증 체크 필터 종료: {}", requestURI);
    }
  }

  private boolean isLoginCheckPath(String requestURI) {
    return !PatternMatchUtils.simpleMatch(whitelist, requestURI);
  }
}
