package construct;

public class Member {
    String name;
    int age;
    int grade;

    Member(String name, int age) {
        this(name, age, 80);
    }
    Member(String name, int age, int grade) {
        System.out.println("name: " + name + ", age: " + age + ", grade: " + grade);
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
}
