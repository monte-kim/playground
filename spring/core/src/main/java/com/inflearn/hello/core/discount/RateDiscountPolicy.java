package com.inflearn.hello.core.discount;

import com.inflearn.hello.core.annotation.MainDiscountPolicy;
import com.inflearn.hello.core.member.Grade;
import com.inflearn.hello.core.member.Member;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
//@Primary
@MainDiscountPolicy
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
