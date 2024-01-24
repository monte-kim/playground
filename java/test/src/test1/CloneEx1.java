package test1;

public class CloneEx1 implements Cloneable {
    private int x;
    private int y;

    CloneEx1(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Object clone() throws CloneNotSupportedException {
        Object obj = null;
        try {
            obj = super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return obj;
    }

    public static void main(String[] args) {
        CloneEx1 obj = new CloneEx1(1, 2);
        CloneEx1 obj1 = null;
        try {
            obj1 = (CloneEx1) obj.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
        obj1.x++;
        System.out.println(obj.x + " " + obj.y);
        System.out.println(obj1.x + " " + obj1.y);
    }
}
