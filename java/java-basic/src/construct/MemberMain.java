package construct;

public class MemberMain {
    public static void main(String[] args) {
        Member member1 = new Member("홍길동", 16, 60);
        Member member2 = new Member("홍길동", 16);

        Member[] members = {member1, member2};

        for (Member member : members) {
            System.out.println("NAME: " + member.name + ", AGE: " + member.age + ", GRADE: " + member.grade);
        }
    }
}
