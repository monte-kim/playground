package test1;

public class ExceptionEx {
    public static void main(String[] args) {
        System.out.println("START");
        try {
            troubleMaker();
            Exception err = new Exception("getMessage() 불렀냐?");
//            throw err;
//            throw new Exception("걍 불러봤다 짜샤");
//            System.out.println(0/0);
        } catch (ArithmeticException ae) {
            ae.printStackTrace();
            System.out.println("[ARITHMETIC ERROR] " + ae.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("[OTHER ERROR] " + e.getMessage());
        }
        System.out.println("END");
    }

     /*throws ArithmeticException를 추가하는 이유는
     이 메소드를 호출하는 곳에서 예외처리를 하도록 강제하기 위함이다.
     만약 throws ArithmeticException를 추가하지 않으면
     이 메소드를 호출하는 곳에서 예외처리를 하지 않아도 된다.
     그러나 이 메소드를 호출하는 곳에서 예외처리를 하지 않으면
     이 메소드를 호출하는 곳에서 예외가 발생했을 때
     이 메소드를 호출하는 곳의 상위 메소드로 예외가 전달되고
     상위 메소드에서 예외처리를 하지 않으면
     상위 메소드를 호출하는 곳으로 예외가 전달되고
     이런 식으로 계속 전달되다가
     main() 메소드까지 전달되면
     main() 메소드에서 예외처리를 하지 않으면
     프로그램이 비정상적으로 종료된다.
     그래서 이 메소드를 호출하는 곳에서 예외처리를 하도록 강제하기 위해
     throws ArithmeticException를 추가한다.*/
    private static void troubleMaker() throws ArithmeticException {
        System.out.println("troubleMaker() START");
        System.out.println(0/0);
        System.out.println("troubleMaker() END");
    }
}
