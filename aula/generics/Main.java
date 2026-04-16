// Objetos da Bolsa
class Estojo{
    private String name;
    public Estojo(){
        this.name = "Estojo";
    }
}
class Bolsa<T>{
    T t;
    public T get(T t){
        return t;
    }
}

public class Main {
    public static void main(String[] args) {
        //Bolsa<String> bolsa = new Bolsa<String>();
        Estojo estojo = new Estojo();
        Bolsa<Estojo> bolsaEstojo = new Bolsa<Estojo>();
        System.out.println(bolsaEstojo.get(estojo));
    }
}
