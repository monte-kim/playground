package hello.jdbc.repository;

import static hello.jdbc.connection.ConnectionConst.*;
import static org.assertj.core.api.Assertions.*;

import com.zaxxer.hikari.HikariDataSource;
import hello.jdbc.domain.Member;
import java.sql.SQLException;
import java.util.NoSuchElementException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

@Slf4j
class MemberRepositoryV1Test {

  MemberRepositoryV1 repository;

  @BeforeEach
  void beforeEach() {
    //    DriverManagerDataSource dataSource = new DriverManagerDataSource(URL, USERNAME, PASSWORD);
    HikariDataSource dataSource = new HikariDataSource();
    dataSource.setJdbcUrl(URL);
    dataSource.setUsername(USERNAME);
    dataSource.setPassword(PASSWORD);
    repository = new MemberRepositoryV1(dataSource);
  }

  @AfterEach
  void clear() {}

  @Test
  void crud() throws SQLException {
    // save
    Member member = new Member("memberV3", 10000);
    repository.save(member);

    // findById
    Member findMember = repository.findById(member.getId());
    log.info("findMember = {}", findMember);
    assertThat(findMember).isEqualTo(member);

    // update: money: 10000 -> 20000
    repository.update(member.getId(), 20000);
    Member updatedMember = repository.findById(member.getId());
    assertThat(updatedMember.getMoney()).isEqualTo(20000);

    // delete
    repository.delete(member.getId());
    assertThatThrownBy(() -> repository.findById(member.getId()))
        .isInstanceOf(NoSuchElementException.class);

    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }
}
