package hello.servlet.web.frontcontroller.v5;

import java.util.List;

public class HandlerAdapterList {

  private final List<MyHandlerAdapter> handlerAdapters;

  public HandlerAdapterList(List<MyHandlerAdapter> handlerAdapters) {
    this.handlerAdapters = handlerAdapters;
  }

  public MyHandlerAdapter getHandlerAdapter(Object handler) {
    for (MyHandlerAdapter handlerAdapter : handlerAdapters) {
      if (handlerAdapter.supports(handler)) {
        return handlerAdapter;
      }
    }
    throw new IllegalArgumentException("handler adapter 를 찾을 수 없습니다. handler=" + handler);
  }
}