package hello.servlet.web.frontcontroller.v5;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

public class HandlerMappingMap {

  private final Map<String, Object> handlerMappingMap;

  public HandlerMappingMap(Map<String, Object> handlerMappingMap) {
    this.handlerMappingMap = handlerMappingMap;
  }

  public Object getHandler(HttpServletRequest request) {
    String requestURI = request.getRequestURI();
    return handlerMappingMap.get(requestURI);
  }
}