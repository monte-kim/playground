package com.inflearn.hello.core.discount;

import com.inflearn.hello.core.member.Grade;
import com.inflearn.hello.core.member.Member;
import org.springframework.stereotype.Component;

@Component
public class RateDiscountPolicy implements DiscountPolicy {

  private final int discountPercent = 10;

  @Override
  public int discount(Member member, int price) {
    if (member.getGrade() == Grade.VIP) {
      return price * discountPercent / 100;
    }

    return 0;
  }
}
