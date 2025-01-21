package jpabook.jpashop.domain.item;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
//@DiscriminatorValue(value = "B")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class Book extends Item {

  private String author;
  private String isbn;

  public static Book createBook(String name, int price, int stockQuantity, String author, String isbn) {
    return Book.builder()
        .name(name)
        .price(price)
        .stockQuantity(stockQuantity)
        .author(author)
        .isbn(isbn)
        .build();
  }

  public void updateBook(String name, int price, int stockQuantity, String author, String isbn) {
    updateItem(name, price, stockQuantity);
    this.author = author;
    this.isbn = isbn;
  }
}
