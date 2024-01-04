package access.ex;

public class MaxCounter {
    private int count;
    private int max;

    public MaxCounter(int max) {
        count = 0;
        this.max = max;
    }

    public void increment() {
        if (isMax()) {
            System.out.println("COUNT IS ALREADY MAX");
            return;
        }
        count++;
    }

    public int getCount(){
        return count;
    }

    private boolean isMax() {
        return count >= max;
    }
}
