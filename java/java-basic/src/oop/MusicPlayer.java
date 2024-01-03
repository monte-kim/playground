package oop;

public class MusicPlayer {
    int volume = 0;
    boolean isOn = false;

    void on() {
        this.isOn = true;
        System.out.println("MUSIC PLAYER ON");
    }

    void off() {
        this.isOn = false;
        System.out.println("MUSIC PLAYER OFF");
    }

    void volumeUp() {
        this.volume++;
        System.out.println("VOLUME UP:" + this.volume);
    }

    void volumeDown() {
        this.volume--;
        System.out.println("VOLUME DOWN:" + this.volume);
    }

    void showStatus() {
        System.out.println("MUSIC PLAYER STATE");
        if (this.isOn) {
            System.out.println("ON & VOLUME: " + this.volume);
        } else {
            System.out.println("OFF");
        }
    }
}
