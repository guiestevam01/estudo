class User{
    private int id = 0;
    private String name;
    public User(){
        id += 1;

    }

}
class Library{
    private Book book;
    public addBook(String name){
        book.name = name;
    }
}

class Book{
    private String name;
    public Book(String name){
        this.name = name;
    }
}

public class LibraryManagementSystem{
    public static void main(String[] args){
        User user = new User("Guilherme");
        Book book = new Book("Senhor dos aneis");
    }
}
