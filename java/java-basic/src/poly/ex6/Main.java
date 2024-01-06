package poly.ex6;

public class Main {
    public static void main(String[] args) {
        Duck duck = new Duck();
        Bear bear = new Bear();

        soundAnimal(duck);
        moveAnimal(duck);
        flyAnimal(duck);
        soundAnimal(bear);
        moveAnimal(bear);
//        flyAnimal(bear);
    }

    private static void soundAnimal(Animal animal){
        animal.sound();
    }
    private static void moveAnimal(Animal animal){
        animal.move();
    }
    private static void flyAnimal(Fly fly){
        fly.fly();
    }
}
