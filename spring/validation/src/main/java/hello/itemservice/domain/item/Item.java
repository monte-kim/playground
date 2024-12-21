package hello.itemservice.domain.item;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Data
// @ScriptAssert(
//    lang = "javascript",
//    script = "_this.price * _this.quantity >= 10000",
//    message = "10000원보다 비싸게 ㄱㄱ")
public class Item {

  //  @NotNull(groups = UpdateCheck.class)
  private Long id;

  //  @NotBlank(
  //      message = "공백X",
  //      groups = {SaveCheck.class, UpdateCheck.class})
  private String itemName;

  //  @NotNull(groups = {SaveCheck.class, UpdateCheck.class})
  //  @Range(
  //      max = 1000000,
  //      min = 1000,
  //      groups = {SaveCheck.class, UpdateCheck.class})
  private Integer price;

  //  @NotNull(groups = {SaveCheck.class, UpdateCheck.class})
  //  @Range(
  //      max = 9999,
  //      groups = {SaveCheck.class})
  private Integer quantity;

  public Item() {}

  public Item(String itemName, Integer price, Integer quantity) {
    this.itemName = itemName;
    this.price = price;
    this.quantity = quantity;
  }
}
