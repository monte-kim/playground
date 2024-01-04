package static2;

//import static static2.DecoData.staticCall;
import static static2.DecoData.*;

public class DecoDataMain {
    public static void main(String[] args) {
        DecoData.staticCall();
        DecoData data = new DecoData();
        data.instanceCall();
//        DecoData.staticCall();
        staticCall();
        staticCall();
        staticCall();
        staticCall();
        staticCall();
        printTest();
    }
    static void printTest(){
        System.out.println("HELLO WORLD");
    }
}
