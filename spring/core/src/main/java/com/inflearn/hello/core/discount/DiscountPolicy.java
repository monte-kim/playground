package com.inflearn.hello.core.discount;

import com.inflearn.hello.core.member.Member;

public interface DiscountPolicy {

  /**
   * @param member
   * @param price
   * @return 할인 대상 금액
   */
  int discount(Member member, int price);
}
