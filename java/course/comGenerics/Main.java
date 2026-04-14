package course.comGenerics;

public class Main {
    public static void main(String[] args) {
        Tools kunai = new Tools("Kunai");
        Tools shuriken = new Tools("Shuriken");
        Tools papelBomb = new Tools("Papel Bomb");
        GenericBags genericBags = new GenericBags();
        genericBags.addTools(kunai);
    }
}
