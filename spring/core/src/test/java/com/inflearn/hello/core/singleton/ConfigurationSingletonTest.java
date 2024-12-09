package com.inflearn.hello.core.singleton;

import com.inflearn.hello.core.AppConfig;
import com.inflearn.hello.core.member.MemberRepository;
import com.inflearn.hello.core.member.MemberService;
import com.inflearn.hello.core.member.MemberServiceImpl;
import com.inflearn.hello.core.member.MemoryMemberRepository;
import com.inflearn.hello.core.order.OrderService;
import com.inflearn.hello.core.order.OrderServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.assertj.core.api.Assertions.*;

public class ConfigurationSingletonTest {

    @Test
    void configurationTest(){
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

        MemberServiceImpl memberService = (MemberServiceImpl) ac.getBean("memberService", MemberService.class);
        OrderServiceImpl orderService = (OrderServiceImpl) ac.getBean("orderService", OrderService.class);
        MemberRepository memberRepository = ac.getBean("memberRepository", MemberRepository.class);

        assertThat(memberRepository).isSameAs(memberService.getMemberRepository());
        assertThat(memberService.getMemberRepository()).isSameAs(orderService.getMemberRepository());
    }

    @Test
    void configurationDeep(){
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
        AppConfig bean = ac.getBean(AppConfig.class);

    }
}
