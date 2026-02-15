public class ExampleArrays{
  public static void main(String[] args){
    //declaracao completa;
    int[] exampleArray = new int[3];
    exampleArray[0] = 1;
    exampleArray[1] = 2;
    exampleArray[2] = 3;
    System.out.print("[ ");
    for(int i = 0;i < 3; i++){
      System.out.print(exampleArray[i] + " ,");
    }
    System.out.println("]");
    //declaracao e inicializacao.
    int[] example2 = {1,2,3,4};
  }
}
