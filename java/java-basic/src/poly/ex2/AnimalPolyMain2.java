package poly.ex2;

public class AnimalPolyMain2 {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();
        Cow cow = new Cow();
        Duck duck =new Duck();

        Animal[] animalArr = {dog, cat, cow, duck};
        for (Animal animal : animalArr) {
            animal.sound();
        }
    }
}
