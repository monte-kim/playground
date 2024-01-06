package poly.ex.pay0;

public abstract class PayMethod {
    public static Pay findPayMethod(String option) {
        Pay payMethod;
        switch (option) {
            case "kakao":
                payMethod = new KakaoPay();
                break;
            case "naver":
                payMethod = new NaverPay();
                break;
            case "mu":
                payMethod = new MuPay();
                break;
            default:
                payMethod = new NoPay();
        }
        return payMethod;
    }
}
