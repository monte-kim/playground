package poly.basic;

public class PolyMain {
    public static void main(String[] args) {
//        부모 변수가 부모 인스턴스 참조
        System.out.println("Parent -> Parent");
        Parent parent = new Parent();
        parent.parentMethod();

        System.out.println();

//      자식 변수가 자식 인스턴스 참조
        System.out.println("Child -> Child");
        Child child = new Child();
        child.parentMethod();
        child.childMethod();

        System.out.println();

//        부모 변수가 자식 인스턴스 참조(다형적 참조)
        System.out.println("Parent -> Child");
        Parent poly = new Child();
        poly.parentMethod();
//        poly.childMethod();   // 부모 타입이 자식 타입의 메서드를 호출할 수는 없음(자식에 대한 정보가 없기 때문 == 자식 방향으로 찾아 내려갈 수 있는 방법이 없음)

//        Child child1 = new Parent();  // 자식은 부모를 담을 수 없다.
    }
}
