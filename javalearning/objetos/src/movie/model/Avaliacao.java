package movie.model;

public class Avaliacao {
    private final int nota;
    private final String comentario;

    public Avaliacao(int nota, String comentario) {
        if (nota < 0 || nota > 5) {
            throw new IllegalArgumentException(
                    "A nota deve estar entre 0 e 5"
            );
        }
        this.nota = nota;
        this.comentario = comentario;
    }

    public int getNota() {
        return nota;
    }
}
