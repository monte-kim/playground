package hello.jdbc.repository;

import hello.jdbc.domain.Member;
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
import org.springframework.jdbc.support.SQLErrorCodeSQLExceptionTranslator;
import org.springframework.jdbc.support.SQLExceptionTranslator;

/** SQLExceptionTranslator 추가 */
@Slf4j
public class MemberRepositoryV4_2 implements MemberRepository {

  private final DataSource dataSource;
  private final SQLExceptionTranslator exTranslator;

  public MemberRepositoryV4_2(DataSource dataSource) {
    this.dataSource = dataSource;
    this.exTranslator =
        new SQLErrorCodeSQLExceptionTranslator(dataSource); // 어떤 DB를 사용하는지에 따라 예외 구현체가 있기 때문에
  }

  @Override
  public Member save(Member member) {
    String sql = "inserteeee into member(member_id, money) values (?, ?);";

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
      throw exTranslator.translate("save(*)", sql, e);
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
      throw exTranslator.translate("findById()", sql, e);
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
      throw exTranslator.translate("update()", sql, e);
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
      throw exTranslator.translate("delete()", sql, e);
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
