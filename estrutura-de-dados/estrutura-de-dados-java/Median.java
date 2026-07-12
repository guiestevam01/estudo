import java.util.Arrays;

public class Median{
    public static void main(String[] args){
        int[] array1 = {1, 2};
        int[] array2 = {3, 4};
        System.out.printf("%.5f", solution(array1,array2));
    }
    static double solution(int[] nums1, int[] nums2){
        double resultado;
        int[] vAux = new int[nums1.length + nums2.length];
        System.arraycopy(nums1, 0, vAux, 0,nums1.length);
        System.arraycopy(nums2, 0, vAux, nums1.length, nums2.length);
        Arrays.sort(vAux);
        if(vAux.length % 2 != 0){
            resultado = vAux[vAux.length/2];
        } else{
            resultado = ( vAux[vAux.length/2] + vAux[vAux.length/2 -1] )/ 2.0;
        }
        return resultado;
    }
}
