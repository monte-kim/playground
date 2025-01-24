package jpabook.jpashop;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jpabook.jpashop.domain.Address;
import jpabook.jpashop.domain.Delivery;
import jpabook.jpashop.domain.Member;
import jpabook.jpashop.domain.Order;
import jpabook.jpashop.domain.OrderItem;
import jpabook.jpashop.domain.item.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class InitDB {

  private final InitService initService;

  @PostConstruct
  public void init() {
    initService.dbInit1();
    initService.dbInit2();
  }

  @Component
  @Transactional
  @RequiredArgsConstructor
  static class InitService {

    private final EntityManager em;

    public void dbInit1() {
      Member member = createMember("Monte", "서울", "한강대로", "12345");
      em.persist(member);

      Book book1 = createBook("모두의 JPA", 10000, 100);
      em.persist(book1);

      Book book2 = createBook("모두의 네트워크", 12000, 70);
      em.persist(book2);

      OrderItem orderItem1 = OrderItem.createOrderItem(book1, 10000, 1);
      OrderItem orderItem2 = OrderItem.createOrderItem(book2, 12000, 2);

      Delivery delivery = createDelivery(member);
      Order order = Order.createOrder(member, delivery, orderItem1, orderItem2);
      em.persist(order);
    }

    private Delivery createDelivery(Member member) {
      Delivery delivery = new Delivery();
      delivery.setAddress(member.getAddress());
      return delivery;
    }

    public void dbInit2() {
      Member member = createMember("Bud", "제주시", "서문로", "14762");
      em.persist(member);

      Book book1 = createBook("Spring Boot 입문", 32000, 200);
      em.persist(book1);

      Book book2 = createBook("데이터베이스론", 24000, 120);
      em.persist(book2);

      OrderItem orderItem1 = OrderItem.createOrderItem(book1, 30000, 28);
      OrderItem orderItem2 = OrderItem.createOrderItem(book2, 24000, 2);

      Delivery delivery = createDelivery(member);
      Order order = Order.createOrder(member, delivery, orderItem1, orderItem2);
      em.persist(order);
    }

    private Member createMember(String name, String city, String street, String zipcode) {
      Member member = new Member();
      member.setName(name);
      member.setAddress(new Address(city, street, zipcode));
      return member;
    }

    private Book createBook(String name, int price, int stockQuantity) {
      Book book1 = new Book();
      book1.setName(name);
      book1.setPrice(price);
      book1.setStockQuantity(stockQuantity);
      return book1;
    }
  }
}

