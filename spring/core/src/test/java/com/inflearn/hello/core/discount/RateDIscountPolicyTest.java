package com.inflearn.hello.core.discount;

import com.inflearn.hello.core.member.Grade;
import com.inflearn.hello.core.member.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class RateDIscountPolicyTest {

  RateDiscountPolicy discountPolicy = new RateDiscountPolicy();

  @Test
  @DisplayName("VIP는 10% 할인이 적용되어야 한다")
  void vip_o() {
    Member member = new Member(1L, "memberVIP", Grade.VIP);

    int discount = discountPolicy.discount(member, 10000);

    assertThat(discount).isEqualTo(1000);
  }

  @Test
  @DisplayName("NONE VIP는 할인이 없다")
  void vip_x() {
    Member member = new Member(1L, "memberBASIC", Grade.BASIC);

    int discount = discountPolicy.discount(member, 10000);

    assertThat(discount).isEqualTo(0);
  }
}
