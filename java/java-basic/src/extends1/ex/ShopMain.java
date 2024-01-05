package extends1.ex;

public class ShopMain {
    public static void main(String[] args) {
        Book book = new Book("Java", 10000, "Han", "IT133");
        Album album = new Album("Album1", 15000, "seo");
        Movie movie = new Movie("영화1", 30000, "감독1", "배우1");

        book.print();
        album.print();
        movie.print();

        int sum = book.getPrice() + album.getPrice() + movie.getPrice();
        System.out.println("상품 가격의 합: " + sum + "원");
    }
}
