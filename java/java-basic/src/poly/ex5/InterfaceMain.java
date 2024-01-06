package poly.ex5;

public class InterfaceMain {
    public static void main(String[] args) {
        Duck duck = new Duck();
        Bear bear = new Bear();
        act(duck);
        act(bear);
    }

    private static void act(InterfaceAnimal animal){
        animal.sound();
        animal.move();
        System.out.println();
    }
}
