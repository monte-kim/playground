package oop;

public class MusicPlayerMain1 {
    public static void main(String[] args) {
        int volume = 0;
        boolean isOn = false;

        isOn = true;
        System.out.println("MUSIC PLAYER ON");

        volume++;
        System.out.println("volume:" + volume);

        volume--;
        System.out.println("volume:" + volume);

        System.out.println("MUSIC PLAYER STATE");
        if(isOn){
            System.out.println("ON & VOLUME: " + volume);
        }else{
            System.out.println("OFF");
        }
    }
}
