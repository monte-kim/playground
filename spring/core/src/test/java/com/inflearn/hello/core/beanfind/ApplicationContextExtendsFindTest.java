package com.inflearn.hello.core.beanfind;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import com.inflearn.hello.core.AppConfig;
import com.inflearn.hello.core.discount.DiscountPolicy;
import com.inflearn.hello.core.discount.FixedDiscountPolicy;
import com.inflearn.hello.core.discount.RateDiscountPolicy;
import com.inflearn.hello.core.member.MemberService;
import com.inflearn.hello.core.member.MemberServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.NoUniqueBeanDefinitionException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

class ApplicationContextExtendsFindTest {
  AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(TestConfig.class);

  @Test
  @DisplayName("부모 타입으로 조회 시 자식 둘 이상이면 중복 오류")
  void findBeanByParentType() {
    assertThrows(NoUniqueBeanDefinitionException.class, () -> ac.getBean(DiscountPolicy.class));
  }

  @Test
  @DisplayName("부모 타입으로 조회 시 자식 둘 이상이면 빈 이름 지정")
  void findBeanByParentTypeWithBeanName() {
    DiscountPolicy rateDiscountPolicy = ac.getBean("rateDiscountPolicy", DiscountPolicy.class);
    assertThat(rateDiscountPolicy).isInstanceOf(RateDiscountPolicy.class);
  }

  @Test
  @DisplayName("자식 타입으로 조회")
  void findBeanByChildType() {
    DiscountPolicy rateDiscountPolicy = ac.getBean("rateDiscountPolicy", RateDiscountPolicy.class);
    assertThat(rateDiscountPolicy).isInstanceOf(RateDiscountPolicy.class);
  }

  @Test
  @DisplayName("부모 타입으로 모두 조회")
  void findAllBeansByParentType() {
    Map<String, DiscountPolicy> beansOfType = ac.getBeansOfType(DiscountPolicy.class);
    assertThat(beansOfType.size()).isEqualTo(2);
    for (String key : beansOfType.keySet()) {
      System.out.println(key + " : " + beansOfType.get(key));
    }
  }

  @Test
  @DisplayName("Object 타입으로 모두 조회")
  void findAllBeansByObjectType() {
    Map<String, Object> beansOfType = ac.getBeansOfType(Object.class);
    for (String key : beansOfType.keySet()) {
      System.out.println(key + " : " + beansOfType.get(key));
    }
  }

  @Configuration
  static class TestConfig {
    @Bean
    public DiscountPolicy rateDiscountPolicy() {
      return new RateDiscountPolicy();
    }

    @Bean
    public DiscountPolicy fixedDiscountPolicy() {
      return new FixedDiscountPolicy();
    }
  }
}
