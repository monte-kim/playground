package test1;

import java.util.HashMap;
import java.util.List;

public class MapEx1 {
    public static void main(String[] args) {
//        제품 판매
        HashMap<String, Integer> map = new HashMap<>();
        map.put("커피", 2000);
        map.put("콜라", 1500);
        map.put("사이다", 1500);
        map.put("라면", 3000);

        System.out.println(map);

//        entryset
        for (HashMap.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue());
        }
//        Entry는 Map의 내부 인터페이스로, Map.Entry를 통해 Entry 객체를 얻을 수 있다.
//        Map.Entry는 key와 value를 가지고 있다.
//        Map.Entry는 getKey()와 getValue() 메소드를 제공한다.
//        Map.Entry는 Map 인터페이스의 내부 인터페이스이므로 Map 인터페이스를 구현한 클래스에서만 사용할 수 있다.

    }
}
