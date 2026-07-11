import java.util.Scanner; 

public class Main{
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int[] v = new int[n];
        long sum = 0;
        for(int i = 0; i<n;i++){
            v[i] = scanner.nextInt();
            sum += v[i];
        }
        sum = Math.abs(sum);
        System.out.printf("%d", sum);
    }
}
