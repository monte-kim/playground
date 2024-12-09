package com.inflearn.hello.core.order;

import com.inflearn.hello.core.discount.DiscountPolicy;
import com.inflearn.hello.core.member.Member;
import com.inflearn.hello.core.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderServiceImpl implements OrderService {

  private final MemberRepository memberRepository;
  private final DiscountPolicy discountPolicy;

  @Autowired
  public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
    this.memberRepository = memberRepository;
    this.discountPolicy = discountPolicy;
  }

  @Override
  public Order createOrder(Long memberId, String itemName, int itemPrice) {
    Member member = memberRepository.findById(memberId);
    int dicountPrice = discountPolicy.discount(member, itemPrice);

    return new Order(memberId, itemName, itemPrice, dicountPrice);
  }

  public MemberRepository getMemberRepository() {
    return memberRepository;
  }
}
