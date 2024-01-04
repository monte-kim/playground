package access.ex;

public class ShoppingCart {
    private Item[] items = new Item[10];
    private int itemCount;

    public void addItem(Item item) {
        if (itemCount > items.length) {
            System.out.println("CART IS FULL");
            return;
        }

        items[itemCount] = item;
        itemCount++;
    }

    public void displayItems() {
        int total = 0;
        System.out.println("YOUR CART LIST");
        for (int i = 0; i < itemCount; i++) {
            System.out.println("ITEM: " + items[i].getName() + ", PRICE: " + items[i].getTotalPrice());
            total += items[i].getTotalPrice();
        }
        System.out.println("TOTAL PRICE: " + total);
    }
}
