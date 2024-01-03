package oop;

public class MusicPlayerMain4 {
    public static void main(String[] args) {
        MusicPlayer mp3 = new MusicPlayer();
        mp3.on();
        mp3.volumeUp();
        mp3.volumeUp();
        mp3.volumeDown();
        mp3.showStatus();
        mp3.off();
    }
}
