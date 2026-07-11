public class LinearSearch{
    static int linearSearch1(int[] v,int element){
        for(int i = 0; i<v.length;i++ ){
             if(v[i] == element){
                return i;
             }
        }
        return -1;
    }
    static boolean searchString(String str, char target){
       /* for(int i = 0; i<str.length();i++){
            if(target == str.charAt[i] ){
                return true;
            }
        }*/
        for(char ch : str.toCharArray()){
            if(ch == target){
                return true;
            }
        }
        return false;
    }
    static int searchInRange(int[] v, int target, int inicio, int fim){
        for(int i = inicio; i < fim ; i++){
            if(v[i] == target){
                return i;
            }
        }
        return -1;
    }
    static int min(int[] v){
        int ans = v[0];
        for(int value : v){
            if(value < ans){
                ans = value;
            }
        }
        return ans;
    }
         
}

class Solution{
    public int findNumbers(int[] v){
        for(int value : v){
            if(value >= 10){
                if(value % 2 == 0){
                    
                }
            }
        }
    }
}
