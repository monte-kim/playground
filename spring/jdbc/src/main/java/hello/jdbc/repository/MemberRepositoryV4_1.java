package hello.jdbc.repository;

import hello.jdbc.domain.Member;
import hello.jdbc.repository.ex.MyDbException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.NoSuchElementException;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.support.JdbcUtils;

/** - 예외 누수 문제 해결 - 체크 예외를 런타임 예외로 변경 트랜잭션 MemberRepository 인터페이스 사용 throws SQLException 제거 */
@Slf4j
public class MemberRepositoryV4_1 implements MemberRepository {

  private final DataSource dataSource;

  public MemberRepositoryV4_1(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  @Override
  public Member save(Member member) {
    String sql = "insert into member(member_id, money) values (?, ?);";

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, member.getId());
      pstmt.setInt(2, member.getMoney());
      pstmt.executeUpdate();
      return member;
    } catch (SQLException e) {
      throw new MyDbException(e);
    } finally {
      close(conn, pstmt, null);
    }
  }

  @Override
  public Member findById(String memberId) {
    String sql = "select * from member where member_id=?";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, memberId);
      rs = pstmt.executeQuery();
      if (rs.next()) {
        Member member = new Member();
        member.setId(rs.getString("member_id"));
        member.setMoney(rs.getInt("money"));
        return member;
      } else {
        throw new NoSuchElementException("member not found memberId = " + memberId);
      }
    } catch (SQLException e) {
      throw new MyDbException(e);
    } finally {
      close(conn, pstmt, rs);
    }
  }

  @Override
  public void update(String memberId, int money) {
    String sql = "update member set money=? where member_id=?";

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setInt(1, money);
      pstmt.setString(2, memberId);
      int resultSize = pstmt.executeUpdate();
      log.info("resultSize = {}", resultSize);
    } catch (SQLException e) {
      throw new MyDbException(e);
    } finally {
      close(conn, pstmt, null);
    }
  }

  @Override
  public void delete(String memberId) {
    String sql = "delete from member where member_id=?";

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, memberId);
      pstmt.executeUpdate();
    } catch (SQLException e) {
      throw new MyDbException(e);
    } finally {
      close(conn, pstmt, null);
    }
  }

  private void close(Connection conn, Statement stmt, ResultSet rs) {

    JdbcUtils.closeResultSet(rs);
    JdbcUtils.closeStatement(stmt);
    DataSourceUtils.releaseConnection(conn, dataSource);
  }

  private Connection getConnection() throws SQLException {
    Connection conn = DataSourceUtils.getConnection(dataSource);
    log.info("get connection={}, class={}", conn, conn.getClass());
    return conn;
  }
}
