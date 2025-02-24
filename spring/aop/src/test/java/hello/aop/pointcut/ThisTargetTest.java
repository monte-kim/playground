package hello.aop.pointcut;

import hello.aop.member.MemberService;
import hello.aop.pointcut.ThisTargetTest.ThisTargetAspect;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Slf4j
@Import(ThisTargetAspect.class)
//@SpringBootTest(properties = "spring.aop.proxy-target-class=false")
@SpringBootTest(properties = "spring.aop.proxy-target-class=true")
public class ThisTargetTest {

    @Autowired
    MemberService memberService;

    @Test
    void success() {
        log.info("memberService Proxy={}", memberService.getClass());
        memberService.hello("helloA");
    }

    @Slf4j
    @Aspect
    static class ThisTargetAspect {

        @Before("this(hello.aop.member.MemberService)")
        public void doThisInterface(JoinPoint joinPoint) {
            log.info("[this-interface] {}", joinPoint.getSignature());
        }

        @Before("target(hello.aop.member.MemberService)")
        public void doTargetInterface(JoinPoint joinPoint) {
            log.info("[target-interface] {}", joinPoint.getSignature());
        }

        @Before("this(hello.aop.member.MemberServiceImpl)")
        public void doThis(JoinPoint joinPoint) {
            log.info("[this-impl] {}", joinPoint.getSignature());
        }

        @Before("target(hello.aop.member.MemberServiceImpl)")
        public void doTarget(JoinPoint joinPoint) {
            log.info("[target-impl] {}", joinPoint.getSignature());
        }
    }
}
