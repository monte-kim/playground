package hellojpa;

import jakarta.persistence.*;

public class JpaMainPersistenceContext {

  public static void main(String[] args) {

    EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
    EntityManager em = emf.createEntityManager();

    EntityTransaction tx = em.getTransaction();
    tx.begin();

    try {
//      Member member = new Member(1L, "member");
      MemberForPersistenceContext member = new MemberForPersistenceContext();
      member.setName("Member");
      System.out.println("==============");
      em.persist(member);
      System.out.println("==============");
//        em.flush();
      member.setName("Test");
//      member.setName("Member");

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