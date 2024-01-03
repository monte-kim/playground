package oop;

public class MusicPlayerMain2 {
    public static void main(String[] args) {
        MusicPlayerData data = new MusicPlayerData();
        on(data);
        volumeUp(data);
        volumeUp(data);
        volumeUp(data);
        showStatus(data);
    }

    static void on(MusicPlayerData data){
        data.isOn = true;
        System.out.println("MUSIC PLAYER ON");
    }
    static void off(MusicPlayerData data) {
        data.isOn = false;
        System.out.println("MUSIC PLAYER OFF");
    }
    static void volumeUp(MusicPlayerData data) {
        data.volume++;
        System.out.println("volume:" + data.volume);
    }
    static void volumeDown(MusicPlayerData data) {
        data.volume--;
        System.out.println("volume:" + data.volume);
    }
    static void showStatus(MusicPlayerData data) {
        System.out.println("MUSIC PLAYER STATE");
        if(data.isOn){
            System.out.println("ON & VOLUME: " + data.volume);
        }else{
            System.out.println("OFF");
        }
    }
}
