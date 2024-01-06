package poly.ex2;

public class AnimalPolyMain1 {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();
        Cow cow = new Cow();
        Duck duck =new Duck();

        animalSound(dog);
        animalSound(cat);
        animalSound(cow);
        animalSound(duck);
    }

    private static void animalSound(Animal animal) {
        animal.sound();
    }
}
