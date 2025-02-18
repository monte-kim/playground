package hello.proxy.cglib.code;

import java.lang.reflect.Method;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cglib.proxy.MethodInterceptor;
import org.springframework.cglib.proxy.MethodProxy;

@Slf4j
@RequiredArgsConstructor
public class TimeMethodInterceptor implements MethodInterceptor {

    private final Object target;

    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        log.info("TimeProxy 실행");
        long start = System.currentTimeMillis();

        Object result = methodProxy.invoke(target, args);
        
        long end = System.currentTimeMillis();
        log.info("TimeProxy 종료, resultTime={}", end - start);
        return result;
    }
}
