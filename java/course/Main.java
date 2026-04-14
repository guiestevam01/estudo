package course;

public class Main {
    public static void main(String[] args) {
        BagKunai bagKunai = new BagKunai();
        String nome;
        Kunai kunai = bagKunai.addKunai("kunai louca");
        Kunai kunai2 = bagKunai.addKunai("Kunai doidadsd");
        Kunai kunai3 = bagKunai.addKunai("Kunai doidadsd");
        Kunai kunai5 = bagKunai.addKunai("Kunai doidadsd");
        System.out.println("digite o nome da kunai que voce deseja");
        System.out.println(kunai.toString());
        System.out.println(bagKunai.toString());
    }
}
