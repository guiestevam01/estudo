import java.util.Arrays; 
public class Sorted{
    public static void main(String[] args) {
        int[] v = {1,2,3,322,1,23,12};
        System.out.println(Arrays.toString(v));
        //System.out.println(isSorted(v));
       // System.out.printf("%.2f", median(v));
       reverse(v);
       System.out.println(Arrays.toString(v));
        
    }
    static boolean isSorted(int[] v){
        boolean sort = false;
        int k = 0;
        for(int i = 1; i < v.length; i++){
            if(v[i] <= v[i-1]){
                return false;
            }
        }
        return true;
    }
    static double median(double[] d){
        double sum = 0;
        for(double v : d){
            sum += v;
        }
        return sum/d.length;
    }
    static void reverse(int[] v){
        int aux = 0;
        int k = v.length-1;
        for(int i = 0; i < k; i++){
            aux = v[i];
            v[i] = v[k];
            v[k] = aux;
            k--;

        }
    }
}
