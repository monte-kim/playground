package poly.ex4;

public class Duck extends AbstractAnimal {
    @Override
    public void sound(){
        System.out.println("QUACK!!!");
    }

    @Override
    public void move() {
        System.out.println("DUCK IS ON THE MOVE~!");
    }
}
