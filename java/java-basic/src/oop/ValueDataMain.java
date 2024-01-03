package oop;

public class ValueDataMain {
    public static void main(String[] args) {
        ValueData valueData = new ValueData();
        valueData.value = 0;
        valueData.add();
        System.out.println("valueData.value = " + valueData.value);
    }
}
