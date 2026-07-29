import java.time.Instant;
import java.time.ZoneId;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

public class Produto{
    private String nome;
    private double preco;
    private final Instant dataCriacao = Instant.now();

    public void setNome(String nome){
        this.nome = nome;
    }
    public String getNome(){
        return nome;
    }
    public void setPreco(double preco){
        this.preco = preco;
    }
    public double getPreco(){
        return preco;
    }
    public Produto(String nome, double preco){
        this.nome = nome;
        this.preco = preco;
    }
    public Instant getDataCriacao(){
        return dataCriacao;
    }
}

class Mercado{
    private String nome;
    private List<Produto> produtos = new ArrayList<>();

    public void  addProdutos(Produto produto){
        produtos.add(produto);
    }
    public List<Produto> getProdutos(){
        return List.copyOf(produtos);
    }
}
