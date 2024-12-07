package com.inflearn.hello.core;

import com.inflearn.hello.core.member.Grade;
import com.inflearn.hello.core.member.Member;
import com.inflearn.hello.core.member.MemberService;
import com.inflearn.hello.core.member.MemberServiceImpl;
import com.inflearn.hello.core.order.Order;
import com.inflearn.hello.core.order.OrderService;
import com.inflearn.hello.core.order.OrderServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class OrderApp {
  public static void main(String[] args) {
    //    AppConfig appConfig = new AppConfig();
    //    MemberService memberService = appConfig.memberService();
    //    OrderService orderService = appConfig.orderService();

    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
    MemberService memberService = ac.getBean("memberService", MemberService.class);
    OrderService orderService = ac.getBean("orderService", OrderService.class);

    Long memberId = 1L;
    Member member = new Member(memberId, "memberA", Grade.VIP);
    memberService.join(member);

    Order order = orderService.createOrder(memberId, "itemA", 20000);

    System.out.println("order = " + order);
    System.out.println("order = " + order.calculatePrice());
  }
}
