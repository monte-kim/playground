package hellojpa.jpql;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

public class JpqlApplication {

  public static void main(String[] args) {

    EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
    EntityManager em = emf.createEntityManager();

    EntityTransaction tx = em.getTransaction();
    tx.begin();

    try {
      Team team = new Team();
      team.setName("teamA");
      em.persist(team);

      Member member = new Member();
      member.setUsername("memberA");
      member.setAge(10);
      member.changeTeam(team);
      em.persist(member);

      Member member2 = new Member();
      member2.setUsername("memberB");
      member2.setAge(10);
      member2.changeTeam(team);
      em.persist(member2);

      em.flush();
      em.clear();

//      String query =
//          "select "
//              + "case when m.age <= 10 then '학생요금'"
//              + " when m.age >= 60 then '경로요금'"
//              + " else '일반요금'"
//              + " end"
//              + " from Member m";
      String query = "select function('group_concat', m.username) from Member m";
      List<String> result = em.createQuery(query, String.class)
          .getResultList();
      for (String m : result) {
        System.out.println("m = " + m);
      }

      tx.commit();
    } catch (Exception e) {
      tx.rollback();
      e.printStackTrace();
    } finally {
      em.close();
    }
    emf.close();
  }
}
