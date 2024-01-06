package poly.ex4;

public class Bear extends AbstractAnimal {
    @Override
    public void sound() {
        System.out.println("GROWL!!!");
    }

    @Override
    public void move() {
        System.out.println("BEAR IS ON THE MOVE~!");
    }
}
