package ref;

public class Method1 {
    public static void main(String[] args) {
//        Student student1 = new Student("Monte", 27, 100);
//        Student student2 = new Student("Tae Hwan", 26, 100);
        Student student1 = new Student();
        initStudent(student1, "Monte", 27, 100);

        Student student2 = new Student();
        initStudent(student2, "Tae Hwan", 26, 100);

        printStudentInfo(student1);
        printStudentInfo(student2);
    }

    public static void initStudent(Student student, String name, int age, int grade){
        student.name = name;
        student.age = age;
        student.grade = grade;
    }

    public static void printStudentInfo(Student student) {
        System.out.println("이름:" + student.name + ", 나이:" + student.age + ", 성 적:" + student.grade);
    }
}
