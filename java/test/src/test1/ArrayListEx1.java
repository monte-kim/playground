package test1;

import java.util.ArrayList;

public class ArrayListEx1 {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();
        list.add(2);
        list.add(1);
//        list length
        System.out.println(list.size());
        list.sort(null);
        System.out.println(list);

    }
}
