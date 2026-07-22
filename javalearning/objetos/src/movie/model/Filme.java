package movie.model;

import java.time.Duration;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


/**
 * Representa um filme com título, duração, ano de lançamento e diretor.
 *
 * As instâncias desta classe são imutáveis e a classe não pode ser
 * estendida. Essa decisão foi inspirada nos itens 17 e 19 do livro
 * Java Efetivo, de Joshua Bloch: minimizar a mutabilidade e projetar
 * cuidadosamente para herança ou proibi-la.
 *
 * Um filme válido deve possuir título não vazio, duração positiva,
 * ano de lançamento positivo e diretor não nulo.
 */
public final class Filme {
    private final String titulo;
    private final Duration duracao;
    private final Diretor diretor;
    private final Year anoDeLancamento;

    /**
     * Cria um filme válido.
     *
     * @param titulo título do filme; não pode ser nulo nem estar em branco
     * @param duracao duração em minutos; deve ser maior que zero
     * @param anoDeLancamento ano de lançamento; deve ser maior que zero
     * @param diretor diretor do filme; não pode ser nulo
     *
     * @throws IllegalArgumentException se o título, a duração ou o ano
     *                                  forem inválidos
     * @throws NullPointerException se o diretor for nulo
     */

    public Filme(String titulo, long duracao, int anoDeLancamento, Diretor diretor){

        /*
         * Os parâmetros são validados antes de serem armazenados,
         * seguindo o Item 49 do Java Efetivo:
         * verificar a validade dos parâmetros.
         */
        this.titulo = validarTitulo(titulo);
        this.duracao = validaDuracao(duracao);
        this.anoDeLancamento = validarAnoLancamento(anoDeLancamento);
        this.diretor = Objects.requireNonNull(diretor, "Diretor deve ser obrigatorio");
    }

    private static String validarTitulo(String titulo) {
        if (titulo == null || titulo.isBlank()) {
            throw new IllegalArgumentException(
                    "O nome não pode ser nulo nem estar em branco"
            );
        }
        return titulo;
    }
    private static Year validarAnoLancamento(int ano){
        if(ano <= 0){
            throw new IllegalArgumentException("Ano não deve ser menor ou igual a zero");
        }
        return Year.of(ano);
    }
    private static Duration validaDuracao(long minutes){
        if(minutes <= 0 ){
            throw new IllegalArgumentException("Duracao não pode ser igual ou inferior a zero!");
        }
        return Duration.ofMinutes(minutes);
    }

    public Year getAnoDeLancamento(){
        return anoDeLancamento;
    }
    public String getTitulo(){
        return titulo;
    }

    public Duration getDuracao(){
        return duracao;
    }
    public long duracaoEmMinuto(){
        return duracao.toMinutes();
    }
    public long duracaoEmSegundo(){
        return duracao.toSeconds();
    }
}