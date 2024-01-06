package poly.ex2;

public class AnimalPolyMain3 {
    public static void main(String[] args) {
        Animal[] animalArr = {new Dog(), new Cat(), new Cow(), new Duck(), new Pig()};
        for (Animal animal : animalArr) {
             soundAnimal(animal);
        }
    }

    private static void soundAnimal(Animal animal) {
//        animal class name without package name
        System.out.print(animal.getClass().getSimpleName() + " ");
        animal.sound();
    }
}
