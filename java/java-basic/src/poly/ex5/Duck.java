package poly.ex5;

public class Duck implements InterfaceAnimal{
    @Override
    public void sound() {
        System.out.print("Quack. ");
    }

    @Override
    public void move() {
        System.out.println("Tap, tap.");
    }
}
