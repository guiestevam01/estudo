//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
void main() {
    Caderno caderno = new Caderno("Caderno de estudos", "A4");
    Camisa camisa = new Camisa("Camisa de praia", "M");
    Bolsa<Object> minhaBolsa = new Bolsa<>();
    minhaBolsa.addMateriais(caderno);
    minhaBolsa.addMateriais(camisa);
    System.out.println(minhaBolsa.getMateriais());
}
