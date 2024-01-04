package static2.ex;

public class MathArrayUtils {
    private MathArrayUtils() {
//        인스턴스 생성을 막음
    }

    public static int sum(int[] values) {
        int result = 0;
        for (int value : values) {
            result += value;
        }
        return result;
    }

    public static double average(int[] values) {
        return (double) sum(values) / values.length;
    }

    public static int min(int[] values) {
        int min = values[0];
        for (int value : values) {
            if (value < min) {
                min = value;
            }
        }
        return min;
    }

    public static int max(int[] values) {
        int max = values[0];
        for(int i = 1; i < values.length; i++){
            if (values[i] > max) {
                max = values[i];
            }
        }
        return max;
    }
}
