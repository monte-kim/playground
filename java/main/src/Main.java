import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Stack;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		StringBuilder sb = new StringBuilder();

		int K = Integer.parseInt(st.nextToken());
		int N = Integer.parseInt(st.nextToken());
		int[] cables = new int[K];

		long max = 0;
		for (int i = 0; i < K; i++) {
			cables[i] = Integer.parseInt(br.readLine());
			max = Math.max(max, cables[i]);
		}

		long left = 1;
		long right = max;
		long result = 0;
		while(left <= right){
			long mid = (left + right)/2;
			long count = 0;

			for(int i = 0; i < K; i++){
				count += cables[i] / mid;
			}

			if(count >= N){
				result = mid;
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		bw.write(String.valueOf(result));
		bw.flush();
		bw.close();
		br.close();
	}
}