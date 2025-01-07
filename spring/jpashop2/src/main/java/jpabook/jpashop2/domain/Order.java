package jpabook.jpashop2.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
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

  @Column(name = "MEMBER_ID")
  private Long memberId;

  private LocalDateTime orderDate;

  @Enumerated(EnumType.STRING)
  private OrderStatus status;
}
