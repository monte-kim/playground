package poly.ex.pay0;

public class NoPay implements Pay{
//    null object pattern = 객체가 없을 때, null을 대신해서 사용하는 객체
    @Override
    public boolean pay(int amount) {
        System.out.println("결제 수단이 없습니다.");
        return false;
    }
}
