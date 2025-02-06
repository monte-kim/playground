package study.datajpa.repository;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;
import study.datajpa.dto.MemberDto;
import study.datajpa.dto.MemberProjection;
import study.datajpa.entity.Member;
import study.datajpa.entity.Team;

@SpringBootTest
@Transactional
//@Rollback(value = false)
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    EntityManager em;

    @Test
    void MemberSaveTest() {
        System.out.println("memberRepository = " + memberRepository.getClass());
        // given
        Member member = new Member("memberA");
        Member savedMember = memberRepository.save(member);

        // when
        Member findMember = memberRepository.findById(savedMember.getId()).orElseThrow();

        // then
        assertThat(savedMember).isEqualTo(findMember);
    }

    @Test
    void basicCRUD() {
        Member member1 = new Member("member1");
        Member member2 = new Member("member2");
        memberRepository.save(member1);
        memberRepository.save(member2);

        //단건 조회 검증
        Member findMember1 = memberRepository.findById(member1.getId()).get();
        Member findMember2 = memberRepository.findById(member2.getId()).get();
        assertThat(findMember1).isEqualTo(member1);
        assertThat(findMember2).isEqualTo(member2);

        //리스트 조회 검증
        List<Member> all = memberRepository.findAll();
        assertThat(all.size()).isEqualTo(2);

        //카운트 검증
        long count = memberRepository.count();
        assertThat(count).isEqualTo(2);

        //삭제 검증
        memberRepository.delete(member1);
        memberRepository.delete(member2);
        long deletedCount = memberRepository.count();
        assertThat(deletedCount).isEqualTo(0);
    }

    @Test
    void findByUsernameAndAgeGreaterThan() {
        Member member1 = new Member("member");
        member1.setAge(17);
        Member member2 = new Member("member");
        member2.setAge(20);
        memberRepository.save(member1);
        memberRepository.save(member2);

        List<Member> members = memberRepository.findByUsernameAndAgeGreaterThan("member", 17);
        assertThat(members.get(0).getAge()).isGreaterThan(15);
        assertThat(members.size()).isEqualTo(1);
    }

    @Test
    void testNamedQuery() {
        Member member1 = new Member("member1");
        memberRepository.save(member1);

        List<Member> members = memberRepository.findByUsername("member1");
        Member findMember = members.get(0);
        assertThat(findMember).isEqualTo(member1);
    }

    @Test
    void testQuery() {
        Member member1 = new Member("member1");
        member1.setAge(27);
        memberRepository.save(member1);

        List<Member> members = memberRepository.findMembers("member1", 27);
        assertThat(members.size()).isEqualTo(1);
        assertThat(members.get(0)).isEqualTo(member1);
    }

    @Test
    void findUsernameList() {
        Member member1 = new Member("member1");
        Member member2 = new Member("member2");
        memberRepository.save(member1);
        memberRepository.save(member2);

        List<String> usernameList = memberRepository.findUsernameList();
        assertThat(usernameList).contains("member1", "member2");
    }

    @Test
    void findMemberDto() {
        Team team = new Team("team1");
        teamRepository.save(team);

        Member member1 = new Member("member1");
        member1.setTeam(team);
        memberRepository.save(member1);

        List<MemberDto> members = memberRepository.findMemberDto();
        for (MemberDto memberDto : members) {
            System.out.println("memberDto = " + memberDto);
        }
    }

    @Test
    void findByNames() {
        Member member1 = new Member("member1");
        Member member2 = new Member("member2");
        memberRepository.save(member1);
        memberRepository.save(member2);

        List<Member> members = memberRepository.findByNames(Arrays.asList("member1", "member2"));
        assertThat(members).contains(member1, member2);
    }

    @Test
    public void paging() {
        //given
        memberRepository.save(new Member("member1", 10));
        memberRepository.save(new Member("member2", 10));
        memberRepository.save(new Member("member3", 10));
        memberRepository.save(new Member("member4", 10));
        memberRepository.save(new Member("member5", 10));

        int age = 10;
        PageRequest pageRequest = PageRequest.of(0, 3, Sort.by(Direction.DESC, "username"));

        Page<Member> page = memberRepository.findPageByAge(age, pageRequest);

        // 페이징 했고 DTO로 변환
//        Page<MemberDto> toMap = page.map(member ->
//            new MemberDto(member.getId(), member.getUsername(), member.getTeam().getName())
//        );

        //then
        List<Member> members = page.getContent();
        long totalElements = page.getTotalElements();

        assertThat(members.size()).isEqualTo(3);
        assertThat(totalElements).isEqualTo(5);
        assertThat(page.getNumber()).isEqualTo(0);
        assertThat(page.getTotalPages()).isEqualTo(2);
        assertThat(page.isFirst()).isTrue();
        assertThat(page.hasNext()).isTrue();
    }

    @Test
    public void slicing() {
        //given
        memberRepository.save(new Member("member1", 10));
        memberRepository.save(new Member("member2", 10));
        memberRepository.save(new Member("member3", 10));
        memberRepository.save(new Member("member4", 10));
        memberRepository.save(new Member("member5", 10));

        int age = 10;
        PageRequest pageRequest = PageRequest.of(0, 3, Sort.by(Direction.DESC, "username"));

        Slice<Member> slice = memberRepository.findSliceByAge(age, pageRequest);

        //then
        List<Member> members = slice.getContent();

        assertThat(members.size()).isEqualTo(3);
        assertThat(slice.getNumber()).isEqualTo(0);
        assertThat(slice.isFirst()).isTrue();
        assertThat(slice.hasNext()).isTrue();
    }

    @Test
    void bulkUpdate() {
        // given
        memberRepository.save(new Member("member1", 10));
        memberRepository.save(new Member("member2", 19));
        memberRepository.save(new Member("member3", 20));
        memberRepository.save(new Member("member4", 30));
        memberRepository.save(new Member("member5", 40));

        // when
        int resultCount = memberRepository.bulkAgePlus(20);
//        em.flush();
//        em.clear();

        List<Member> members = memberRepository.findByUsername("member5");
        Member member5 = members.get(0);

        // then
        assertThat(resultCount).isEqualTo(3);
        assertThat(member5.getAge()).isEqualTo(41);
    }

    @Test
    void findMemberLazy() {
        // given
        Team teamA = new Team("teamA");
        Team teamB = new Team("teamB");
        teamRepository.save(teamA);
        teamRepository.save(teamB);
        Member member1 = new Member("member1", 10, teamA);
        Member member2 = new Member("member2", 10, teamB);
        memberRepository.save(member1);
        memberRepository.save(member2);
        em.flush();
        em.clear();

        // when
        List<Member> members = memberRepository.findAll();
//        List<Member> members = memberRepository.findMemberWithFetchJoin();
        for (Member member : members) {
            System.out.println("member = " + member.getUsername());
            System.out.println("member.team = " + member.getTeam().getName());
        }
    }

    @Test
    void queryHint() {
        Member member = new Member("member1", 10);
        memberRepository.save(member);
        em.flush();
        em.clear();
        Member findMember = memberRepository.findReadOnlyByUsername(member.getUsername());
        findMember.setUsername("member2");

        em.flush();
    }

    @Test
    void lock() {
        Member member = new Member("member1", 10);
        memberRepository.save(member);
        em.flush();
        em.clear();
        List<Member> result = memberRepository.findLockByUsername(member.getUsername());
    }

    @Test
    void callCustom() {
        List<Member> memberCustom = memberRepository.findMemberCustom();
    }

    @Test
    public void specBasic() throws Exception {
//given
        Team teamA = new Team("teamA");
        em.persist(teamA);
        Member m1 = new Member("m1", 0, teamA);
        Member m2 = new Member("m2", 0, teamA);
        em.persist(m1);
        em.persist(m2);
        em.flush();
        em.clear();
//when
        Specification<Member> spec =
            MemberSpec.username("m1").and(MemberSpec.teamName("teamA"));
        List<Member> result = memberRepository.findAll(spec);
//then
        assertThat(result.size()).isEqualTo(1);
    }

    @Test
    public void queryByExample() throws Exception {
//given
        Team teamA = new Team("teamA");
        em.persist(teamA);
        em.persist(new Member("m1", 0, teamA));
        em.persist(new Member("m2", 0, teamA));
        em.flush();
//when
//Probe 생성
        Member member = new Member("m1");
        Team team = new Team("teamA"); //내부조인으로 teamA 가능
        member.setTeam(team);
//ExampleMatcher 생성, age 프로퍼티는 무시
        ExampleMatcher matcher = ExampleMatcher.matching()
            .withIgnorePaths("age");
        Example<Member> example = Example.of(member, matcher);
        List<Member> result = memberRepository.findAll(example);
//then
        assertThat(result.size()).isEqualTo(1);
    }

    @Test
    void projections() {
        // given
        Team teamA = new Team("teamA");
        em.persist(teamA);
        Member m1 = new Member("m1", 0, teamA);
        Member m2 = new Member("m2", 0, teamA);
        em.persist(m1);
        em.persist(m2);
        em.flush();
        em.clear();

        // when
        List<NestedClosedProjections> result = memberRepository.findProjectionsByUsername("m1",
            NestedClosedProjections.class);

        for (NestedClosedProjections nestedClosedProjections : result) {
            String username = nestedClosedProjections.getUsername();
            System.out.println("username = " + username);
            String teamName = nestedClosedProjections.getTeam().getName();
            System.out.println("teamName = " + teamName);
        }
    }

    @Test
    void nativeQuery() {
        // given
        // given
        Team teamA = new Team("teamA");
        em.persist(teamA);
        Member m1 = new Member("m1", 0, teamA);
        Member m2 = new Member("m2", 0, teamA);
        em.persist(m1);
        em.persist(m2);
        em.flush();
        em.clear();

        // when
        Member result = memberRepository.findByNativeQuery("m1");
        System.out.println("result = " + result);

        // then
    }

    @Test
    void nativeProjection() {
        // given
        // given
        Team teamA = new Team("teamA");
        em.persist(teamA);
        Member m1 = new Member("m1", 0, teamA);
        Member m2 = new Member("m2", 0, teamA);
        em.persist(m1);
        em.persist(m2);
        em.flush();
        em.clear();

        // when
        Page<MemberProjection> result = memberRepository.findByNativeProjection(
            PageRequest.of(0, 10));
        List<MemberProjection> content = result.getContent();
        for (MemberProjection memberProjection : content) {
            System.out.println(
                "memberProjection.getUsername() = " + memberProjection.getUsername());
            System.out.println(
                "memberProjection.getTeamName() = " + memberProjection.getTeamName());
        }

        // then
    }
}