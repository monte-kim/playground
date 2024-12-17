package hello.springmvc.basic.requestmapping;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class MappingController {

  @GetMapping("/hello-basic")
  public String helloBasic() {
    log.info("basic");
    return "ok";
  }

  @GetMapping("/mapping/users/{userId}/orders/{orderId}")
  public String mappingPath(@PathVariable("userId") String userId, @PathVariable("orderId") String orderId) {
    log.info("Id={}, {}", userId, orderId);
    return "EIWOFJOWEIJF";
  }
}
