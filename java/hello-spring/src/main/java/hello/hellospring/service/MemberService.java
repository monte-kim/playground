package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * 회원가입
     */
    // @Transactional 는 JPA가 제공하는 기능으로, 이 어노테이션이 있으면 메서드가 실행되는 도중에 예외가 발생하면 해당 메서드에서 이루어진 모든 DB작업을 rollback 해준다. (JPA의 모든 데이터 변경은 트랜잭션 안에서 실행되어야 한다.)
    public Long join(Member member) {
        validateMemberDuplication(member); //중복 회원 검증
        memberRepository.save(member);
        return member.getId();
    }

    private void validateMemberDuplication(Member member) {
        memberRepository.findByName(member.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    /**
     * 전체 회원 조회
     */
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
