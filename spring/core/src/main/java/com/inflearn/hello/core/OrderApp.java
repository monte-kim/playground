package com.inflearn.hello.core;

import com.inflearn.hello.core.member.Grade;
import com.inflearn.hello.core.member.Member;
import com.inflearn.hello.core.member.MemberService;
import com.inflearn.hello.core.member.MemberServiceImpl;
import com.inflearn.hello.core.order.Order;
import com.inflearn.hello.core.order.OrderService;
import com.inflearn.hello.core.order.OrderServiceImpl;

public class OrderApp {
  public static void main(String[] args) {
    MemberService memberService = new MemberServiceImpl();
    OrderService orderService = new OrderServiceImpl();

    Long memberId = 1L;
    Member member = new Member(memberId, "memberA", Grade.VIP);
    memberService.join(member);

    Order order = orderService.createOrder(memberId, "itemA", 10000);

    System.out.println("order = " + order);
    System.out.println("order = " + order.calculatePrice());
  }
}
