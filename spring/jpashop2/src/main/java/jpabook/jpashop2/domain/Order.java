package jpabook.jpashop2.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ORDERS")
@Getter
@Setter
public class Order {

  public Order() {
  }

  @Id @GeneratedValue
  @Column(name = "ORDER_ID")
  private Long id;

//  @Column(name = "MEMBER_ID")
//  private Long memberId;

  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member member;

  private LocalDateTime orderDate;

  @Enumerated(EnumType.STRING)
  private OrderStatus status;

  @OneToMany(mappedBy = "order")
  private List<OrderItem> orderItems = new ArrayList<>();

  @OneToOne
  @JoinColumn(name = "DELIVERY_ID")
  private Delivery delivery;

  public void addOrderItem(OrderItem orderItem){
    orderItems.add(orderItem);
    orderItem.setOrder(this);
  }
}
