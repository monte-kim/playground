package test1;

import java.util.*;

public class Bingo {
    public static void main(String[] args) {
        Set set = new LinkedHashSet(); // 중복을 허용하지 않는다. (순서를 보장한다.)
        // Set set = new HashSet();
        int[][] board = new int[5][5];

        for (int i = 0; set.size() < 25; i++) {
            set.add((int)(Math.random() * 50) + 1 + "");
        }

        Iterator it = set.iterator();

        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                board[i][j] = Integer.parseInt((String) it.next());
                System.out.print((board[i][j] < 10 ? " " : " ") + board[i][j]);
            }
            System.out.println();
        }
    }
}
