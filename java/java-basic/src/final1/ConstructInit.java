package final1;

public class ConstructInit {
    static final int CONST_VALUE = 10;
    final int value;
    final int constValue = 10;

    public ConstructInit(int value) {
//        생성자를 통해서 딱 한 번 할당됨
        this.value = value;
//        constValue = 11;
    }
}
