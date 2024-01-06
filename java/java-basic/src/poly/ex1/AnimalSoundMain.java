package poly.ex1;

public class AnimalSoundMain {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();
        Cow cow = new Cow();

        System.out.println("ANIMAL SOUND TEST START");
        dog.sound();
        cat.sound();
        cow.sound();
        System.out.println("ANIMAL SOUND TEST END");
    }
}
