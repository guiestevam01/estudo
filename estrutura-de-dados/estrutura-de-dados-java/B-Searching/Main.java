import java.util.Scanner; 
public class Main{
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int[] v = new int[n];
        for(int i = 0; i< v.length; i++){
            v[i] = scanner.nextInt(); 
        }
        int target = scanner.nextInt();
        System.out.printf("%d", searching(v,target));

    }
    static int searching(int[] v, int target){
        int i = 0;
        for(int value : v){
            if(value == target){
                return i;
            }
            i++;
        }
        return -1;
    }
}
