package hellojpa;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;
import java.util.List;

public class JpaMain {

  public static void main(String[] args) {

    EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
    EntityManager em = emf.createEntityManager();

    EntityTransaction tx = em.getTransaction();
    tx.begin();

    try {

      Team team = new Team();
      team.setName("TeamA");
      em.persist(team);

      Member member = new Member();
      member.setUsername("member1");
      member.changeTeam(team);
      em.persist(member);

//      team.getMembers().add(member); // Member.class에 setTeam() 안에 넣어줘

      Team findTeam = em.find(Team.class, team.getId());
      List<Member> members = findTeam.getMembers();

      System.out.println(findTeam);

      tx.commit();
    } catch (Exception e) {
      tx.rollback();
    } finally {
      em.close();
    }
    emf.close();

  }
}

//Member member = em.find(Member.class, 1L);
//member.setName("Test");
//em.flush();
//member.setName("AAAAA");