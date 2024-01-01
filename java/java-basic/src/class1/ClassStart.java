package class1;

public class ClassStart {
    public static void main(String[] args) {
//        int[] numbers = new int[10];
        Student[] students = new Student[10];
        for(int i = 0; i < 10; i++){
            students[i] = new Student();
            students[i].name = "Student" + i;
            students[i].age = 20 + i;
            students[i].grade = 70 + i;
            System.out.println("NAME: " + students[i].name + ", AGE: " + students[i].age + ", GRADE: " + students[i].grade);
        }
    }
}
