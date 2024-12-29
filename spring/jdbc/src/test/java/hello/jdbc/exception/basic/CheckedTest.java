package hello.jdbc.exception.basic;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
class CheckedTest {

  @Test
  void checked_catch() {
    Service service = new Service();
    service.callCatch();
  }

  @Test
  void checked_throw() {
    Service service = new Service();
    assertThatThrownBy(() -> service.callThrow()).isInstanceOf(MyCheckedException.class);
  }

  //  Exceptionㅇㅡㄹ 상속 받은 예외는 체크 예외가 된다.
  static class MyCheckedException extends Exception {
    public MyCheckedException(String message) {
      super(message);
    }
  }

  static class Service {
    Repository repository = new Repository();

    public void callCatch() {
      try {
        repository.call();
      } catch (MyCheckedException e) {
        log.info("예외 처리, message={}", e.getMessage(), e);
      }
    }

    public void callThrow() throws MyCheckedException {
      repository.call();
    }
  }

  static class Repository {
    public void call() throws MyCheckedException {
      throw new MyCheckedException("ex");
    }
  }
}
