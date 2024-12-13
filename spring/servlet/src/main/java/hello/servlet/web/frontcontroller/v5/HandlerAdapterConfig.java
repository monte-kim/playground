package hello.servlet.web.frontcontroller.v5;

import hello.servlet.web.frontcontroller.v5.adapter.ControllerV3HandlerAdapter;
import hello.servlet.web.frontcontroller.v5.adapter.ControllerV4HandlerAdapter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HandlerAdapterConfig {

  @Bean
  public List<MyHandlerAdapter> handlerAdapterList() {
    return registerHandlerAdapters();
  }

  private List<MyHandlerAdapter> registerHandlerAdapters() {
    List<MyHandlerAdapter> handlerAdapters = new ArrayList<>();
    handlerAdapters.add(new ControllerV3HandlerAdapter());
    handlerAdapters.add(new ControllerV4HandlerAdapter());
    return handlerAdapters;
  }
}