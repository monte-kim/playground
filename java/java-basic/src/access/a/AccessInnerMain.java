package access.a;

public class AccessInnerMain {
    public static void main(String[] args) {
        AccessData data = new AccessData();
        data.publicField = 100;
        data.publicMethod();

        data.defaultField = 200;
        data.defaultMethod();
//        data.privateField = 300;
//        data.privateMethod();

        data.innerAccess();
    }
}
