package access.b;

import access.a.AccessData;

public class AccessOuterMain {
    public static void main(String[] args) {

        AccessData data = new AccessData();
        data.publicField = 100;
        data.publicMethod();

//        data.defaultField = 200;
//        data.defaultMethod();
//        data.privateField = 300;
//        data.privateMethod();

        data.innerAccess();
    }
}
