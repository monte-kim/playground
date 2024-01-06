package poly.car1;

public class K3Car implements Car{

    @Override
    public void startEngine() {
        System.out.println("K3Car.startEngine");
    }

    @Override
    public void offEngine() {
        System.out.println("K3Car.offEngine");
    }

    @Override
    public void accelerate() {
        System.out.println("K3Car.accelerate");
    }
}
