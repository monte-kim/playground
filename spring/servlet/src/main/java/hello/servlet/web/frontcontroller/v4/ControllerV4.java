package hello.servlet.web.frontcontroller.v4;

import hello.servlet.web.frontcontroller.MyController;
import java.util.Map;

public interface ControllerV4 extends MyController {

  /**
   * @param paramMap
   * @param model
   * @return viewName
   */
  String process(Map<String, String> paramMap, Map<String, Object> model);
}
