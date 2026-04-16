class Sets<T>{
    T t;
    public void print(){
        System.out.println(t);
    }
}

class parString<T>{
    T t;

    public String imprimirString(){
        System.out.println(t);
    }
}

public class Example {
    public static void main(String[] args) {
        Sets<Integer> printInt = new Sets<>();
        printInt.t = 32;
        printInt.print();
    }
}
