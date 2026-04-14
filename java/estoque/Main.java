package estoque;
import java.util.Scanner;
public class Main {
    //menu method
    public int menu(){
        final Scanner scanner = new Scanner(System.in);
        System.out.printf("================================\n   Controle de Estoque\n================================\nSelecione uma opção:  \n1. Adicionar Item\n2. Remover Item\n3. Listar Estoque\n4. Sair\n");
        System.out.print("Opção: ");
        int opt = scanner.nextInt();
        while(opt > 4 || opt < 1){
            System.out.println("Opção inválida! Tente novamente ou digite 4 para sair.");
            System.out.print("Selecione uma opcão valida: ");
            opt = scanner.nextInt();
            scanner.nextLine();
        }
        return opt;
    }
    public static void main(String[] args) {
        final Scanner scanner = new Scanner(System.in);
        Main main = new Main();
        Estoque estoque = new Estoque();
        Item item = new Item();
        int opcao;
        do{
            opcao = main.menu();
            switch (opcao) {
                case 1:
                        System.out.print("Digite o nome do item: ");
                        String itemName = scanner.nextLine();
                        System.out.print("Digite a quantidade: ");
                        int qtdItem = scanner.nextInt(); // leitura de quantidade
                        scanner.nextLine();
                        item.setNome(itemName);
                        item.setQuantidade(qtdItem);
                        estoque.addItem(item);
                    break;
                case 2:
                        System.out.println("Digite o nome do item: ");
                        scanner.nextLine();
                        String removerNome = scanner.nextLine();                        
                        System.out.println("Digite a quantidade: ");
                        int removerQtd = scanner.nextInt();                       
                        estoque.removeByName(removerNome, removerQtd);
                        break;
                case 3:
                        System.out.println(estoque.toString());  // chamada explícita correta
                        break;
                case 4:
                    break;
                default:
                    break;
            }
        } while (opcao != 4);
        scanner.close(); 
    }
}

