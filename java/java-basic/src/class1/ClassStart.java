package class1;

public class ClassStart {
    public static void main(String[] args) {
        Student student1 = new Student();
        student1.name = "John";
        student1.age = 26;
        student1.grade = 90;

        Student student2 = new Student();
        student2.name = "Sam";
        student2.age = 25;
        student2.grade = 80;
        System.out.println("NAME: " + student1.name + ", AGE: " + student1.age + ", GRADE: " + student1.grade);
        System.out.println("NAME: " + student2.name + ", AGE: " + student2.age + ", GRADE: " + student2.grade);
    }
}
