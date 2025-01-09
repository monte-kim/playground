package hellojpa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

//@Entity
@SequenceGenerator(
    name = "MEMBER_SEQ_GENERATOR",
    sequenceName = "MEMBER_SEQ",
    initialValue = 1, allocationSize = 50
    // 50으로 하면, 메모리에서 50개 쌓아두다가 DB로 INSERT 보냄. 그리고 ID는 51부터 다시 100까지 메모리에 저장.
    // 1이라면, 매번 INSERT문 나가기 전에 select next value for MEMBER_SEQ가 발생함
)
@Getter
@Setter
public class MemberForPersistenceContext {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEMBER_SEQ_GENERATOR")
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  private String name;

//  private Integer age;
//
//  @Enumerated(EnumType.STRING)
//  private RoleType roleType;
//
////  @Temporal(TemporalType.TIMESTAMP)
////  private Date createdDate;
//  private LocalDateTime createdDate;
//
////  @Temporal(TemporalType.TIMESTAMP)
////  private Date lastModifiedDate;
//  private LocalDateTime lastModifiedDate;
//
//  @Lob
//  private String description;


  public MemberForPersistenceContext(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public MemberForPersistenceContext() {

  }
}
