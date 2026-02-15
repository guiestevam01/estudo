import java.util.*;

public class Emprestimo{
    public static void main(String[] args){
        double S;
        double N;
        double J;
        Scanner ler = new Scanner(System.in);
        S = ler.nextDouble();
        N = ler.nextDouble();
        J = ler.nextDouble();

        double parcela = S;
        for(int i = 1; i <= N; i++){
            System.out.printf("%d parcela: %.2f%n", i, parcela);
            parcela = parcela * (1+J/100);
        }   

        System.out.println(calculoParcela(4,parcela));
        
    }
    public double getS(){
        return S;
    }
    public double getN(){
        return N;
    }
    public double getJ(){
        return J;
    }

    public double calculoParcela(double n){
        return getS() * Math.pow(1+getJ()/100,n-1);
    }
} 
