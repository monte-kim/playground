package extends1.access.child;

import extends1.access.parent.Parent;

public class Child extends Parent {
    public void call(){
        publicValue = 1;
        protectedValue = 1; // 같은 패키지 내에서는 접근 가능 or (상속 관계)자식 클래스에서 접근 가능
        // defaultValue = 1; // 다른 패키지에서는 접근 불가능
        // privateValue = 1; // private는 자식 클래스에서 접근 불가능

        publicMethod();
        protectedMethod(); // 같은 패키지 내에서는 접근 가능 or (상속 관계)자식 클래스에서 접근 가능
        // defaultMethod(); // 다른 패키지에서는 접근 불가능
        // privateMethod(); // private는 자식 클래스에서 접근 불가능
        printParent();
    }
}
