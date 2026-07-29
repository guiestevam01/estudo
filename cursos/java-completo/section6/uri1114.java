import java.util.Scanner;
public class uri1114{
  public static void main(String[] args){
    Scanner scanner = new Scanner(System.in);
    int a = scanner.nextInt();
    while (a != 2002){
      System.out.println("Senha invalida");
      a = scanner.nextInt();
    }
      System.out.println("Acesso permitido");
  }
}
