package com.inflearn.hello.core.discount;

import com.inflearn.hello.core.member.Grade;
import com.inflearn.hello.core.member.Member;

public class FixedDiscountPolicy implements DiscountPolicy {

  private final int discountFixAmount = 1000;

  @Override
  public int discount(Member member, int price) {
    if (member.getGrade() == Grade.VIP) {
      return discountFixAmount;
    }

    return 0;
  }
}
