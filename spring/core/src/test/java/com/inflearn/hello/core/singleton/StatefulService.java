package com.inflearn.hello.core.singleton;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class StatefulService {

    private int price;

    public int order(String name, int price){
        System.out.println("name: " + name + ", price: " + price);
        return price;
    }
}
