package poly.ex5;

public class Bear implements InterfaceAnimal{
    @Override
    public void sound() {
        System.out.print("Growl! ");
    }

    @Override
    public void move() {
        System.out.print("Thump, thump.");
    }
}
