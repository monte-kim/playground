package com.inflearn.hello.core.web;

import com.inflearn.hello.core.common.MyLogger;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class LogDemoController {

  private final LogDemoService logDemoService;
  private final MyLogger myLogger;

  @RequestMapping("log-demo")
  @ResponseBody
  public String logDemo(HttpServletRequest request) {

    String requestUrl = request.getRequestURL().toString();
    myLogger.setRequestUrl(requestUrl);
    System.out.println("myLogger: " + myLogger);

    myLogger.log("controller test");
    logDemoService.logic("testId");

    return "OK";
  }
}
