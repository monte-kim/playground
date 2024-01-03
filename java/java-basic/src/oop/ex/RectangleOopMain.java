package oop.ex;

public class RectangleOopMain {
    public static void main(String[] args) {
        Rectangle rectangle = new Rectangle();
        rectangle.width = 12;
        rectangle.height = 12;
        
        int area = rectangle.calculateArea();
        System.out.println("area = " + area);

        int perimeter = rectangle.calculatePerimeter();
        System.out.println("perimeter = " + perimeter);

        boolean square = rectangle.isSquare();
        System.out.println("square = " + square);
    }
    
}
