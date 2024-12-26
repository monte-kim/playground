package hello.jdbc.connection.domain;

import lombok.Data;

@Data
public class Member {

  private String id;
  private int money;

  public Member() {}

  public Member(String id, int money) {
    this.id = id;
    this.money = money;
  }
}
