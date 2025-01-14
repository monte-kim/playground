package jpabook.jpashop2.domain;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Delivery {

  @Id @GeneratedValue
  private Long id;

  @Embedded
  private Address address;

  private DeliveryStatus status;

  @OneToOne(mappedBy = "delivery", fetch = FetchType.LAZY)
  private Order order;
}
