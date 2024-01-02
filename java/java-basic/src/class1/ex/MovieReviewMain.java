package class1.ex;

public class MovieReviewMain {
    public static void main(String[] args) {
        MovieReview[] movies = new MovieReview[2];
        
        movies[0] = new MovieReview();
        movies[0].title = "인셉션";
        movies[0].review = "인생은 무한 루프";

        movies[1] = new MovieReview();
        movies[1].title = "어바웃 타임";
        movies[1].review = "인생 시간 영화!";

        for (MovieReview movie : movies) {
            System.out.println("영화 제목: \"" + movie.title + "\", 리뷰: \"" + movie.review + "\"");
        }
    }
}
