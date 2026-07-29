import java.util.ArrayList;
import java.util.List;

public class App {
}
class Album{
    private int id;
    private List<Artista> artistas;
    private List<Musica> musicas;
    private int ano;
}
class Artista{
    private int id;
    private List<Musica> singles;
    private List<Album> albums;
    private String nome;

    public void adicionarSingle(Musica musica){
        singles.add(musica);
    }
}

class Musica{
    private int id;
    private String nome;
    private Album album;
    private int ano;
}