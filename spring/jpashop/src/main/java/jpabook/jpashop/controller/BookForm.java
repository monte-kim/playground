package jpabook.jpashop.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@Builder
public class BookForm {

  private Long id;

  private String name;
  private int price;
  private int stockQuantity;

  private String author;
  private String isbn;

//  public BookUpdateDto toServiceDTO() {
//    return BookUpdateDto.builder()
//        .id(itemId)
//        .name(name)
//        .price(price)
//        .stockQuantity(stockQuantity)
//        .build();
//  }
}
