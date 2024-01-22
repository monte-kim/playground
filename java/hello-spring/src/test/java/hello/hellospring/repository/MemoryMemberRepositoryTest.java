package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

//import org.junit.jupiter.api.Assertions;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

class MemoryMemberRepositoryTest {

    MemoryMemberRepository repository = new MemoryMemberRepository();

    @AfterEach
    public void afterEach(){
        // 테스트가 끝날 때마다 repository를 깔끔하게 지워줌
        repository.clearStore();
    }

    @Test
    public void save(){
        Member member = new Member();
        member.setName("Monte");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();

//        System.out.println("RESULT: " + (result == member));
//        Assertions.assertEquals(member, result);
        assertThat(member).isEqualTo(result);
    }

    @Test
    public void findByName(){
        Member member1 = new Member();
        member1.setName("Spring");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("Monte");
        repository.save(member2);

        Member result = repository.findByName("Spring").get();
        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll(){
        Member member1 = new Member();
        member1.setName("Spring");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("Monte");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }
}
