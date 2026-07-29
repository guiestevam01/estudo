import java.util.Arrays;

public class Teste{
    public static void main(String[] args){
        System.out.println(Arrays.toString(remover(new int[]{10, 20, 30, 40}, 1)));
        System.out.println(Arrays.toString(remover(new int[]{10, 20, 30, 40}, 3)));
        //System.out.println(Arrays.toString(remover(new int[]{10, 20}, 5)));

    }
    static int[] remover(int[] numeros, int indice) {
        int[] arrayAux = new int[numeros.length-1];
        if(indice > arrayAux.length || indice < 0){
            throw new IllegalArgumentException();
        }
        for(int i = 0; i < numeros.length; i++){
            if (i < indice){
                arrayAux[i] = numeros[i];
        } else if(i >= indice){
                arrayAux[i] = numeros[i-1];
            }
        }
        return arrayAux;
    }
}
