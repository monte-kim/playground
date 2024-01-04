package final1;

public class FinalLocalMain {
    public static void main(String[] args) {
        final int data1;
        data1 = 10;
//        data1++;

        method(11);
    }

    static void method(final int param){
//        매개변수의 값을 수정할 수 없음
//        param = 20;
    }
}
