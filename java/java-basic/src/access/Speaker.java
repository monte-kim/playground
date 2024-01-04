package access;

public class Speaker {
    private int volume;

    Speaker(int volume){
        this.volume = volume;
    }

    void volumeUp(){
        if(volume >= 100){
            System.out.println("음량 그만 올려. 벌써 100이야");
        }else{
            volume += 10;
            System.out.println("음량 10 올림");
        }
    }

    void volumeDown(){
        volume -= 10;
        System.out.println("음량 10 내림");
    }

    void showVolume(){
        System.out.println("음량: " + volume);
    }
}
