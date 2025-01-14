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
//
      Member member = new Member();
      member.setName("member1");
//      member.changeTeam(team);
//      member.setTeam(team);
      em.persist(member);
//
////      team.getMembers().add(member); // Member.class에 setTeam() 안에 넣어줘
//
//      Team findTeam = em.find(Team.class, team.getId());
//      List<Member> members = findTeam.getMembers();
//
//      System.out.println(findTeam);

//      Movie movie = new Movie();
//      movie.setDirector("aaa");
//      movie.setActor("bbb");
//      movie.setName("바람과 함께 사라지다");
//      movie.setPrice(10000);
//      em.persist(movie);
//
      em.flush();
      em.clear();
//
//      Movie findMovie = em.find(Movie.class, movie.getId());

//      Member findMember = em.find(Member.class, member.getId());
//      Member findMember = em.find(Member.class, member.getId());
//      System.out.println("findMember = " + findMember.getTeam().getClass());
//      em.detach(findMember);
//      System.out.println("findMember.getId() = " + findMember.getId());
//      System.out.println("findMember.getUsername() = " + findMember.getUsername());

//      System.out.println("findMember.getTeam().getName() = " + findMember.getTeam().getName());

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

//Member member = em.find(Member.class, 1L);
//member.setName("Test");
//em.flush();
//member.setName("AAAAA");