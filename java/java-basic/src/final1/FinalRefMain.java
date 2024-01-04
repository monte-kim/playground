package final1;

public class FinalRefMain {
    public static void main(String[] args) {
        final Data data = new Data();
        // 참조값을 변경하지는 못하지만 참조하는 대상이 가지고 있는 데이터가 바뀌는 건 상관 없음
//        data = new Data();
        data.value = 10;
        System.out.println("data.value = " + data.value);
        data.value = 20;
        System.out.println("data.value = " + data.value);
     }
}
