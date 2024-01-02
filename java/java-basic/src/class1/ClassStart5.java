package class1;

public class ClassStart5 {
    public static void main(String[] args) {
        Student student1;
        student1 = new Student();
        student1.name = "학생1";
        student1.age = 25;
        student1.grade = 100;

        Student student2 = new Student();
        student2.name = "학생2";
        student2.age = 26;
        student2.grade = 100;

        Student[] students = new Student[]{student1, student2};
        
        for (Student student : students) {
            System.out.println("이름:" + student.name + " 나이:" + student.age + " 성 적:" + student.grade);
        }
    }
}
