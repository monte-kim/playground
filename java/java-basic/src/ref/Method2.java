package ref;

public class Method2 {
    public static void main(String[] args) {
//        Student student1 = new Student("Monte", 27, 100);
//        Student student2 = new Student("Tae Hwan", 26, 100);
        Student student1 = createStudent("Monte", 27, 100);
        Student student2 = createStudent("Tae Hwan", 26, 100);

         printStudentInfo(student1);
        printStudentInfo(student2);
    }
    static Student createStudent(String name, int age, int grade){
        Student student = new Student();
        student.name = name;
        student.age = age;
        student.grade = grade;
        return student;
    }

    public static void printStudentInfo(Student student) {
        System.out.println("이름:" + student.name + ", 나이:" + student.age + ", 성 적:" + student.grade);
    }
}
