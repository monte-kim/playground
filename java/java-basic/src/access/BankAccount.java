package access;

public class BankAccount {
    private int balance;

    public BankAccount() {
        balance = 0;
    }

    public void deposit(int amount) {
        if (isAmountValid(amount)) {
            balance += amount;
        } else {
            System.out.println("INVALID AMOUNT");
        }
    }

    public void withdraw(int amount) {
        if(isAmountValid(amount) && balance >= amount){
            balance -= amount;
        } else {
            System.out.println("INVALID AMOUNT");
        }
    }

    public int getBalance(){
        return balance;
    }

//    내부에서만 사용하는 메소드는 private으로 선언한다.
//    외부에서 허용하도록 public으로 한다면
//    이 클래스를 사용하는 개발자 입장에서 본인이 이 함수를 활용해서 검증을 해야하나? 하는 의문을 가지게 된다.
//    이를 사용하는 개발자 입장에서 해당 기능을 사용하는 복잡도도 낮출 수 있다.
    private boolean isAmountValid(int amount) {
        return amount > 0;
    }
}
