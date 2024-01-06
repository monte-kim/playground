package poly.ex.pay0;

import java.util.Scanner;

public class PayMain0 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.print("결제 방식을 입력해주세요: ");
            String payOption = scanner.nextLine();

            if(payOption.equals("exit")){
                System.out.println("종료합니다.");
                break;
            }

            System.out.print("결제 금액을 입력해주세요: ");
            int amount = scanner.nextInt();
            scanner.nextLine();

            PayService payService = new PayService();
            payService.processPay(payOption, amount);
        }

        /*
//        kakao 결제
        String payOption1 = "kakao";
        int amount1 = 5000;
        payService.processPay(payOption1, amount1);

//        naver 결제
        String payOption2 = "naver";
        int amount2 = 10000;
        payService.processPay(payOption2, amount2);

//        mu 결제
        String payOption3 = "mu";
        int amount3 = 50000;
        payService.processPay(payOption3, amount3);

//        잘못된 결제 수단 선택
        String payOption4 = "bad";
        int amount4 = 15000;
        payService.processPay(payOption4, amount4);*/
    }
}
