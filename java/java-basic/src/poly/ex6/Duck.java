package poly.ex6;

public class Duck extends Animal implements Fly {
    @Override
    public void sound() {
        System.out.println("QUACK!!!");
    }

    @Override
    public void fly() {
        System.out.println("오리 날아간다.");
    }
}
