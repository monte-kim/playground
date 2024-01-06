package poly.ex3;

public class AbstractMain {
    public static void main(String[] args) {
//        AbstractAnimal animal = new AbstractAnimal();
        Duck duck = new Duck();
        Bear bear = new Bear();
        act(duck);
        act(bear);
    }
    private static void act(AbstractAnimal animal){
        animal.sound();
        animal.move();
    }
}
