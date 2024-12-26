package hello.jdbc.connection.repository;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import hello.jdbc.connection.domain.Member;
import java.sql.SQLException;
import java.util.NoSuchElementException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

@Slf4j
class MemberRepositoryV0Test {

  MemberRepositoryV0 repository = new MemberRepositoryV0();

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
  }
}
