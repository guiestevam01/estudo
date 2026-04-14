package estoque;
public class Item {
    private String nome;
    private int quantidade;
    
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    @Override
    public String toString() {
        return "Item [nome=" + nome + ", quantidade=" + quantidade + "]";
    }
    public Item(String nome, int quantidade) {
        this.nome = nome;
        this.quantidade = quantidade;
    }
    public Item(){}
    
    
}
