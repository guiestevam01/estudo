import java.util.Random;

public class Sorteio{
    public static void main(String[] args){
        System.out.println(binario());
    }
    static private String binario(){
        int num = gerador();
        String binario = Integer.toBinaryString(num);
        return binario;
    }
    static private int gerador(){
        Random rand = new Random();
        return rand.nextInt(9999);
    }
}
