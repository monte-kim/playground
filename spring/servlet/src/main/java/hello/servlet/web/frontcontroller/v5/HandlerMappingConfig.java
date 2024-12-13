package hello.servlet.web.frontcontroller.v5;

import hello.servlet.web.frontcontroller.MyController;
import hello.servlet.web.frontcontroller.v3.controller.MemberFormControllerV3;
import hello.servlet.web.frontcontroller.v3.controller.MemberListControllerV3;
import hello.servlet.web.frontcontroller.v3.controller.MemberSaveControllerV3;
import hello.servlet.web.frontcontroller.v4.controller.MemberFormControllerV4;
import hello.servlet.web.frontcontroller.v4.controller.MemberListControllerV4;
import hello.servlet.web.frontcontroller.v4.controller.MemberSaveControllerV4;
import java.util.HashMap;
import java.util.Map;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HandlerMappingConfig {

  @Bean
  public Map<String, MyController> handlerMappingMap() {
    return registerHandlers();
  }

  private Map<String, MyController> registerHandlers() {
    HashMap<String, MyController> urlMap = new HashMap<>();

    urlMap.put("/front-controller/v5/v3/members/new-form", new MemberFormControllerV3());
    urlMap.put("/front-controller/v5/v3/members/save", new MemberSaveControllerV3());
    urlMap.put("/front-controller/v5/v3/members", new MemberListControllerV3());

    urlMap.put("/front-controller/v5/v4/members/new-form", new MemberFormControllerV4());
    urlMap.put("/front-controller/v5/v4/members/save", new MemberSaveControllerV4());
    urlMap.put("/front-controller/v5/v4/members", new MemberListControllerV4());
    return urlMap;
  }
}
