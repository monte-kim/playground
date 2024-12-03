package com.inflearn.hello.core.order;

import com.inflearn.hello.core.discount.DiscountPolicy;
import com.inflearn.hello.core.discount.FixedDiscountPolicy;
import com.inflearn.hello.core.member.Member;
import com.inflearn.hello.core.member.MemberRepository;
import com.inflearn.hello.core.member.MemoryMemberRepository;

public class OrderServiceImpl implements OrderService {

  private final MemberRepository memberRepository = new MemoryMemberRepository();
  private final DiscountPolicy discountPolicy = new FixedDiscountPolicy();

  @Override
  public Order createOrder(Long memberId, String itemName, int itemPrice) {
    Member member = memberRepository.findById(memberId);
    int dicountPrice = discountPolicy.discount(member, itemPrice);

    return new Order(memberId, itemName, itemPrice, dicountPrice);
  }
}
