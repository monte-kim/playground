package jpabook.jpashop2.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Embeddable
@Getter
@EqualsAndHashCode
public class Address {

  @Column(length = 10)
  private String city;

  @Column(length = 20)
  private String street;

  @Column(length = 5)
  private String zipcode;

  public String fullAddress(){
    return getCity()  + " " + getStreet() + " " + getZipcode();
  }
}
