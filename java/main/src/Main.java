import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int steps = Integer.parseInt(br.readLine());

		int[] scores = new int[steps + 1];
		for (int i = 1; i <= steps; i++) {
			scores[i] = Integer.parseInt(br.readLine());
		}

		int[] maxScores = new int[steps + 1];
		maxScores[1] = scores[1];
		if (steps >= 2) {
			maxScores[2] = maxScores[1] + scores[2];
		}
		for (int i = 3; i <= steps; i++) {
			maxScores[i] = Math.max(scores[i - 1] + maxScores[i - 3], maxScores[i - 2]) + scores[i];
		}

		System.out.println(maxScores[steps]);
	}
}