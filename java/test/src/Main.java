import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");
        int n = Integer.parseInt(st.nextToken());
        int b = Integer.parseInt(st.nextToken());
        List<Integer> digits = new ArrayList<Integer>();

        while(n > 0){
            digits.add(n % b);
            n /= b;
        }

        for (int digit : digits) {
            if(digit > 9){
                char c = (char)(digit + 'A' - 10);
                sb.append(c);
            }else{
                sb.append(digit);
            }
        }

        System.out.print(sb.reverse().toString());
    }
}