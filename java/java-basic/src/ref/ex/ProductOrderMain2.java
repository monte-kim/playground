package ref.ex;

public class ProductOrderMain2 {
    public static void main(String[] args) {
        ProductOrder[] orders = new ProductOrder[3];
        orders[0] = createProductOrder("맥북", 2000, 1);
        orders[1] = createProductOrder("아이폰", 1000, 2);
        orders[2] = createProductOrder("아이패드", 1500, 2);

        printOrders(orders);
        int totalAmount = getTotalAmount(orders);
        System.out.println("총 주문 금액:" + totalAmount);
    }

    static ProductOrder createProductOrder(String productName, int price, int quantity) {
        ProductOrder productOrder = new ProductOrder();
        productOrder.productName = productName;
        productOrder.price = price;
        productOrder.quantity = quantity;
        return productOrder;
    }
    
    static void printOrders(ProductOrder[] orders){
        for (ProductOrder order : orders) {
            System.out.println("상품명:" + order.productName + ", 가격:" + order.price + ", 수량:" + order.quantity);
        }
    }

    static int getTotalAmount(ProductOrder[] orders){
        int totalAmount = 0;
        for (ProductOrder order : orders) {
            totalAmount += order.price * order.quantity;
        }
        return totalAmount;
    }
}
