package hello.servlet.web.frontcontroller.v3;

import hello.servlet.web.frontcontroller.ModelView;
import hello.servlet.web.frontcontroller.MyController;
import java.util.Map;

public interface ControllerV3 extends MyController {

  ModelView process(Map<String, String> paramMap);
}
