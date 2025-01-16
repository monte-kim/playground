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
      Team teamA = new Team();
      teamA.setName("teamA");
      em.persist(teamA);

      Team teamB = new Team();
      teamB.setName("teamB");
      em.persist(teamB);

      Member member = new Member();
      member.setUsername("memberA");
      member.setAge(10);
      member.changeTeam(teamA);
      em.persist(member);

      Member member2 = new Member();
      member2.setUsername("memberB");
      member2.setAge(10);
      member2.changeTeam(teamA);
      em.persist(member2);

      Member member3 = new Member();
      member3.setUsername("memberC");
      member3.setAge(10);
      member3.changeTeam(teamB);
      em.persist(member3);

      em.flush();
      em.clear();

//      String query = "select m from Member m join fetch m.team";
//      String query = "select t from Team t join fetch t.members";
//      List<Team> result = em.createQuery(query, Team.class).getResultList();
//
//      for (Team team : result) {
//        System.out.println("team: " + team.getName() + ", members: " + team.getMembers());
//      }

      em.createQuery("update Member m set m.age = 20 where m.username = 'memberA'");

      Member m = em.find(Member.class, member.getId());
      System.out.println("m = " + m);

//      Member result = em.createQuery("select m from Member m where m.id = :id", Member.class)
//          .setParameter("id", member.getId())
//          .getSingleResult();
//      System.out.println("member.getAge() = " + result.getAge());

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
