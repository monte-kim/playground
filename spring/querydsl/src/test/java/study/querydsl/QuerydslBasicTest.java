package study.querydsl;

import static com.querydsl.jpa.JPAExpressions.select;
import static org.assertj.core.api.Assertions.assertThat;
import static study.querydsl.entity.QMember.member;
import static study.querydsl.entity.QTeam.team;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import study.querydsl.dto.MemberDto;
import study.querydsl.dto.QMemberDto;
import study.querydsl.dto.UserDto;
import study.querydsl.entity.Member;
import study.querydsl.entity.QMember;
import study.querydsl.entity.Team;

@SpringBootTest
@Transactional
public class QuerydslBasicTest {

    @Autowired
    EntityManager em;

    @Autowired
    EntityManagerFactory emf;

    JPAQueryFactory query;

    @BeforeEach
    void before() {
        query = new JPAQueryFactory(em);
        Team teamA = new Team("teamA");
        Team teamB = new Team("teamB");
        em.persist(teamA);
        em.persist(teamB);

        Member member1 = new Member("member1", 10, teamA);
        Member member2 = new Member("member2", 20, teamA);
        Member member3 = new Member("member3", 30, teamB);
        Member member4 = new Member("member4", 40, teamB);
        Member member5 = new Member("member5", 50, teamB);
        em.persist(member1);
        em.persist(member2);
        em.persist(member3);
        em.persist(member4);
        em.persist(member5);
    }

    @Test
    void startJPQL() {
        Member findByJPQL = em.createQuery("select m from Member m where m.username = :username",
                Member.class)
            .setParameter("username", "member1")
            .getSingleResult();
        assertThat(findByJPQL.getUsername()).isEqualTo("member1");
    }

    @Test
    void startQuerydsl() {
        //QMember m = new QMember("m");

        Member findMember = query.select(member)
            .from(member)
            .where(member.username.eq("member1"))
            .fetchOne();

        assertThat(findMember.getUsername()).isEqualTo("member1");
    }

    @Test
    void search() {
        Member findMember = query.selectFrom(member)
            .where(
                member.username.eq("member1"),
                member.age.eq(10)
            )
            .fetchOne();

        assertThat(findMember.getUsername()).isEqualTo("member1");
    }

    @Test
    void resultFetchTest() {
//        List<Member> fetch = query.selectFrom(member)
//            .fetch();
//
//        Member fetchO = query.selectFrom(member)
//            .fetchOne();
//
//        Member fetchFirst = query.selectFrom(member)
//            .fetchFirst();

        Long count = query.select(member.count())
            .from(member)
            .fetchOne();
        assertThat(count).isEqualTo(5L);
    }

    /**
     * 회원 정렬 순서 1. 회원 나이 내림차순 2. 회원 이름 오름차순 2에서 회원 이름이 없으면 마지막에 출력(nulls last)
     */
    @Test
    void sort() {
        em.persist(new Member(null, 100));
        em.persist(new Member("member5", 100));
        em.persist(new Member("member6", 100));

        List<Member> result = query.selectFrom(member)
            .where(member.age.eq(100))
            .orderBy(member.age.desc(), member.username.asc().nullsLast())
            .fetch();

        assertThat(result.get(0).getUsername()).isEqualTo("member5");
        assertThat(result.get(1).getUsername()).isEqualTo("member6");
        assertThat(result.get(2).getUsername()).isNull();
    }

    @Test
    void paging() {
        List<Member> result = query.selectFrom(member)
            .orderBy(member.username.desc())
            .offset(1) //mysql에서 offset 쿼리 생략 가능해짐
            .limit(2)
            .fetch();

        for (Member member : result) {
            System.out.println("member = " + member.getUsername());
        }

        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void aggregation() {
        List<Tuple> result = query.select(
                member.count(),
                member.age.sum(),
                member.age.avg(),
                member.age.max(),
                member.age.min()
            )
            .from(member)
            .fetch();

        Tuple tuple = result.get(0);
        assertThat(tuple.get(member.count())).isEqualTo(5);
        assertThat(tuple.get(member.age.sum())).isEqualTo(150);
        assertThat(tuple.get(member.age.avg())).isEqualTo(30);
        assertThat(tuple.get(member.age.max())).isEqualTo(50);
        assertThat(tuple.get(member.age.min())).isEqualTo(10);
    }

    @Test
    void group() {
        List<Tuple> result = query.select(team.name, member.age.avg())
            .from(member)
            .join(member.team, team)
            .groupBy(team.name)
            .fetch();

        Tuple teamA = result.get(0);
        Tuple teamB = result.get(1);

        assertThat(teamA.get(team.name)).isEqualTo("teamA");
        assertThat(teamA.get(member.age.avg())).isEqualTo(15);

        assertThat(teamB.get(team.name)).isEqualTo("teamB");
        assertThat(teamB.get(member.age.avg())).isEqualTo(40);
    }

    @Test
    void join() {
        List<Member> result = query.selectFrom(member)
            .join(member.team, team)
            .where(team.name.eq("teamA"))
            .fetch();

        assertThat(result)
            .extracting("username")
            .containsExactly("member1", "member2");
    }

    @Test
    void thetaJoin() {
        em.persist(new Member("teamA"));
        em.persist(new Member("teamB"));
        em.persist(new Member("teamC"));

        List<Member> result = query.select(member)
            .from(member, team)
            .where(member.username.eq(team.name))
            .fetch();

        assertThat(result)
            .extracting("username")
            .containsExactly("teamA", "teamB");
    }

    @Test
    void joinOnFiltering() {
        List<Tuple> result = query.select(member, team)
            .from(member)
            .leftJoin(member.team, team)
            .on(team.name.eq("teamA"))
            .fetch();

        for (Tuple tuple : result) {
            System.out.println("tuple = " + tuple);
        }

        assertThat(result)
            .extracting(tuple -> tuple.get(team))
            .extracting(t -> t == null ? null : t.getName())
            .containsNull()
            .contains("teamA");
    }

    @Test
    void joinOnNoRelation() {
        em.persist(new Member("teamA"));
        em.persist(new Member("teamB"));
        em.persist(new Member("teamC"));

        List<Tuple> result = query.select(member, team)
            .from(member)
            .leftJoin(team)
            .on(member.username.eq(team.name))
            .fetch();

        for (Tuple tuple : result) {
            System.out.println("tuple = " + tuple);
        }
    }

    @Test
    void noFetchJoin() {
        em.flush();
        em.clear();

        Member findMember = query.selectFrom(member)
            .where(member.username.eq("member1"))
            .fetchOne();

        boolean loaded = emf.getPersistenceUnitUtil().isLoaded(findMember.getTeam());
        assertThat(loaded).isFalse();
    }

    @Test
    void fetchJoin() {
        em.flush();
        em.clear();

        Member findMember = query.selectFrom(member)
            .join(member.team, team).fetchJoin()
            .where(member.username.eq("member1"))
            .fetchOne();

        boolean loaded = emf.getPersistenceUnitUtil().isLoaded(findMember.getTeam());
        assertThat(loaded).isTrue();
    }

    @Test
    void subQuery() {
        QMember subMember = new QMember("subMember");

        List<Member> result = query.selectFrom(member)
            .where(member.age.eq(
                select(subMember.age.max())
                    .from(subMember)
            ))
            .fetch();

        assertThat(result).extracting("age").containsExactly(50);
    }

    @Test
    void subQueryGoe() {
        QMember subMember = new QMember("subMember");

        List<Member> result = query.selectFrom(member)
            .where(member.age.goe(
                select(subMember.age.avg())
                    .from(subMember)
            ))
            .fetch();

        assertThat(result).extracting("age").containsExactly(30, 40, 50);
    }

    @Test
    void subQueryIn() {
        QMember subMember = new QMember("subMember");

        List<Member> result = query.selectFrom(member)
            .where(member.age.in(
                select(subMember.age)
                    .from(subMember)
                    .where(subMember.age.gt(20))
            ))
            .fetch();

        assertThat(result).extracting("age").containsExactly(30, 40, 50);
    }

    @Test
    void selectSubQuery() {
        QMember subMember = new QMember("subMember");

        List<Tuple> result = query.select(member.username,
                select(subMember.age.avg())
                    .from(subMember)
            )
            .from(member)
            .fetch();

        for (Tuple tuple : result) {
            System.out.println("tuple = " + tuple);
        }
    }

    @Test
    void basicCase() {
        List<String> result = query.select(member.age
                .when(10).then("열살")
                .when(20).then("스무살")
                .otherwise("기타"))
            .from(member)
            .fetch();

        for (String s : result) {
            System.out.println("s = " + s);
        }
    }

    @Test
    void complexCase() {
        List<String> result = query.select(new CaseBuilder()
                .when(member.age.between(0, 20)).then("0 ~ 20살")
                .when(member.age.between(21, 30)).then("21 ~ 30살")
                .otherwise("기타"))
            .from(member)
            .fetch();

        for (String s : result) {
            System.out.println("s = " + s);
        }
    }

    @Test
    void constant() {
        List<Tuple> result = query.select(member.username, Expressions.constant("A"))
            .from(member)
            .fetch();

        for (Tuple tuple : result) {
            System.out.println("tuple = " + tuple);
        }
    }

    @Test
    void concat() {
        List<String> result = query.select(
                member.username.concat("_").concat(member.age.stringValue()))
            .from(member)
            .where(member.username.eq("member1"))
            .fetch();

        for (String s : result) {
            System.out.println("s = " + s);
        }
    }

    @Test
    void simpleProjection() {
        List<String> result = query.select(member.username)
            .from(member)
            .fetch();

        for (String s : result) {
            System.out.println("s = " + s);
        }
    }

    @Test
    void tupleProjection() {
        List<Tuple> result = query.select(member.username, member.age)
            .from(member)
            .fetch();

        for (Tuple tuple : result) {
            String username = tuple.get(member.username);
            System.out.println("username = " + username);
            Integer age = tuple.get(member.age);
            System.out.println("age = " + age);
        }
    }

    @Test
    void findDtoByJPQL() {
        List<MemberDto> result = em.createQuery(
                "select new study.querydsl.dto.MemberDto(m.username, m.age) from Member m",
                MemberDto.class)
            .getResultList();

        for (MemberDto memberDto : result) {
            System.out.println("memberDto = " + memberDto);
        }
    }

    @Test
    void findDtoByQuerydslSetter() {
        List<MemberDto> result = query.select(
                Projections.bean(MemberDto.class, member.username, member.age))
            .from(member)
            .fetch();

        for (MemberDto memberDto : result) {
            System.out.println("memberDto = " + memberDto);
        }
    }

    @Test
    void findDtoByQuerydslField() {
        List<MemberDto> result = query.select(
                Projections.fields(MemberDto.class, member.username, member.age))
            .from(member)
            .fetch();

        for (MemberDto memberDto : result) {
            System.out.println("memberDto = " + memberDto);
        }
    }

    @Test
    void findDtoByQuerydslConstructor() {
        List<MemberDto> result = query.select(
                Projections.constructor(MemberDto.class, member.username, member.age))
            .from(member)
            .fetch();

        for (MemberDto memberDto : result) {
            System.out.println("memberDto = " + memberDto);
        }
    }

    @Test
    void findUserDtoByQuerydslField() {
        QMember memberSub = new QMember("memberSub");
        List<UserDto> result = query.select(
                Projections.fields(UserDto.class, member.username.as("name"),
                    Expressions.as(
                        JPAExpressions.select(memberSub.age.max())
                            .from(memberSub), "age"
                    )
                )
            )
            .from(member)
            .fetch();

        for (UserDto userDto : result) {
            System.out.println("userDto = " + userDto);
        }
    }

    @Test
    void findUserDtoByQuerydslConstructor() {
        List<UserDto> result = query.select(
                Projections.constructor(UserDto.class, member.username, member.age))
            .from(member)
            .fetch();

        for (UserDto userDto : result) {
            System.out.println("userDto = " + userDto);
        }
    }

    @Test
    void findDtoByQueryProjection() {
        List<MemberDto> result = query.select(new QMemberDto(member.username, member.age))
            .from(member)
            .fetch();

        for (MemberDto memberDto : result) {
            System.out.println("memberDto = " + memberDto);
        }
    }

    @Test
    void dynamicQuery_BooleanBuilder() {
        String usernameParam = "member1";
        Integer ageParam = 10;

        List<Member> result = searchMember1(usernameParam, ageParam);
        assertThat(result.size()).isEqualTo(1);
    }

    private List<Member> searchMember1(String usernameCond, Integer ageCond) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (usernameCond != null) {
            booleanBuilder.and(member.username.eq(usernameCond));
        }
        if (ageCond != null) {
            booleanBuilder.and(member.age.eq(ageCond));
        }

        return query.selectFrom(member)
            .where(booleanBuilder)
            .fetch();
    }

    @Test
    void dynamicQuery_WhereParam() {
        String usernameParam = "member1";
        Integer ageParam = 10;

        List<Member> result = searchMember2(usernameParam, ageParam);
        assertThat(result.size()).isEqualTo(1);
    }

    private List<Member> searchMember2(String usernameCond, Integer ageCond) {
        return query.selectFrom(member)
//            .where(usernameEq(usernameCond), ageEq(ageCond))
            .where(allEq(usernameCond, ageCond))
            .fetch();
    }

    private BooleanExpression usernameEq(String usernameCond) {
        if (usernameCond == null) {
            return null;
        }
        return member.username.eq(usernameCond);
    }

    private BooleanExpression ageEq(Integer ageCond) {
        return ageCond != null ? member.age.eq(ageCond) : null;
    }

    private Predicate allEq(String usernameCond, Integer ageCond) {
        return usernameEq(usernameCond).and(ageEq(ageCond));
    }

    @Test
    void bulkUpdate() {
        long count = query
            .update(member)
            .set(member.username, "비회원")
            .where(member.age.lt(25))
            .execute();
        em.flush();
        em.clear();

        List<Member> result = query
            .selectFrom(member)
            .fetch();

        assertThat(result).extracting("username")
            .doesNotContain("member1", "member2");
    }

    @Test
    void bulkAdd() {
        long count = query
            .update(member)
            .set(member.age, member.age.add(1))
            .execute();
    }

    @Test
    void bulkDelete() {
        long count = query
            .delete(member)
            .where(member.age.gt(18))
            .execute();
    }

    @Test
    void sqlFunction() {
        List<String> result = query
            .select(
                Expressions.stringTemplate(
                    "function('regexp_replace', {0}, {1}, {2})",
                    member.username, "member", "m"
                )
            )
            .from(member)
            .fetch();

        for (String s : result) {
            System.out.println("s = " + s);
        }
    }

    @Test
    void sqlFunction2() {
        List<String> result = query
            .select(member.username)
            .from(member)
//            .where(member.username.eq(
//                Expressions.stringTemplate("function('lower', {0})", member.username)
//            ))
            .where(member.username.eq(member.username.upper()))
            .fetch();

        for (String s : result) {
            System.out.println("s = " + s);
        }
    }
}
