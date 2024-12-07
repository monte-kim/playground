package com.inflearn.hello.core;

import com.inflearn.hello.core.discount.DiscountPolicy;
import com.inflearn.hello.core.discount.FixedDiscountPolicy;
import com.inflearn.hello.core.discount.RateDiscountPolicy;
import com.inflearn.hello.core.member.MemberRepository;
import com.inflearn.hello.core.member.MemberService;
import com.inflearn.hello.core.member.MemberServiceImpl;
import com.inflearn.hello.core.member.MemoryMemberRepository;
import com.inflearn.hello.core.order.OrderService;
import com.inflearn.hello.core.order.OrderServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

  @Bean
  public MemberService memberService() {
    return new MemberServiceImpl(memberRepository());
  }

  @Bean
  public MemberRepository memberRepository() {
    return new MemoryMemberRepository();
  }

  @Bean
  public OrderService orderService() {
    return new OrderServiceImpl(memberRepository(), discountPolicy());
  }

  @Bean
  public DiscountPolicy discountPolicy() {
//    return new FixedDiscountPolicy();
    return new RateDiscountPolicy();
  }
}
