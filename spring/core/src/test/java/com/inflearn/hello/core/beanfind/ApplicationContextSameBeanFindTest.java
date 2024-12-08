package com.inflearn.hello.core.beanfind;

import com.inflearn.hello.core.AppConfig;
import com.inflearn.hello.core.discount.DiscountPolicy;
import com.inflearn.hello.core.member.MemberRepository;
import com.inflearn.hello.core.member.MemberService;
import com.inflearn.hello.core.member.MemberServiceImpl;
import com.inflearn.hello.core.member.MemoryMemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoUniqueBeanDefinitionException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class ApplicationContextSameBeanFindTest {

  AnnotationConfigApplicationContext ac =
      new AnnotationConfigApplicationContext(SameBeanConfig.class);

  @Test
  @DisplayName("타입으로 조회 시 같은 타입이 2 이상 있으면 중복 오류 발생")
  void findBeanByTypeDuplicated() {
    Assertions.assertThrows(
        NoUniqueBeanDefinitionException.class, () -> ac.getBean(MemberRepository.class));
  }

  @Test
  @DisplayName("타입으로 조회 시 같은 타입이 2 이상 있으면 빈 이름을 지정함녀 된다")
  void findBeanByName() {
    MemberRepository memberRepository = ac.getBean("memberRepository1", MemberRepository.class);
    assertThat(memberRepository).isInstanceOf(MemberRepository.class);
  }

  @Test
  @DisplayName("특정 타입 모두 조회하기")
  void findAllBeansByType() {
    Map<String, MemberRepository> beansOfType = ac.getBeansOfType(MemberRepository.class);
    for (String key : beansOfType.keySet()) {
      System.out.println(key + " : " + beansOfType.get(key));
    }

    System.out.println(beansOfType);
    assertThat(beansOfType.size()).isEqualTo(2);
  }

  @Configuration
  static class SameBeanConfig {

    @Bean
    public MemberRepository memberRepository1() {
      return new MemoryMemberRepository();
    }

    @Bean
    public MemberRepository memberRepository2() {
      return new MemoryMemberRepository();
    }
  }
}
