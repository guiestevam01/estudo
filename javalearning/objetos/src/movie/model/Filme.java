        package movie.model;

        import java.time.Duration;
        import java.time.Year;
        import java.util.ArrayList;
        import java.util.List;
        import java.util.Objects;


        public class Filme {
            private String titulo;
            private Diretor diretor;
            private Duration duracao;//pode ser que por algum motivo nao seja essa a duracao, entao por isso nao coloquei final
            private int anoDeLancamento;
            private final List<Avaliacao> avaliacoes = new ArrayList<Avaliacao>();

            public int idadeFilme(){
                int year = Year.now().getValue();
                if(anoDeLancamento > year){
                    throw new IllegalArgumentException("Filme ainda não foi lancado");
                }
                return year - anoDeLancamento;
            }
            public void adicionarAvaliacao(Avaliacao avaliacao){
                avaliacoes.add(Objects.requireNonNull(avaliacao));
            }
            public void adicionarAvaliacao(int nota, String comentario){
                adicionarAvaliacao(new Avaliacao(nota,comentario));
            }
            public double mediaAvaliacao(){
                return avaliacoes.stream().mapToInt(Avaliacao::getNota).average().orElse(0.0);
            }

            public Diretor getDiretor() {
                return diretor;
            }

            public void setDiretor(Diretor diretor) {
                this.diretor = diretor;
            }

            public Duration getDuracao() {
                return duracao;
            }

            public void setDuracao(long minutos) {
                if (minutos <= 0) {
                    throw new IllegalArgumentException(
                            "A duração deve ser positiva"
                    );
                }
                this.duracao = Duration.ofMinutes(minutos);
            }

            public int getAnoDeLancamento() {
                return anoDeLancamento;
            }

            public void setAnoDeLancamento(int anoDeLancamento) {
                this.anoDeLancamento = anoDeLancamento;
            }
            public long getDuracaoEmMinutos() {
                return duracao.toMinutes();
            }

            public long getDuracaoEmSegundos() {
                return duracao.toSeconds();
            }

            public Filme(String titulo, Diretor diretor, long duracaoFilme, int anoDeLancamento) {
                this.diretor = diretor;
                setDuracao(duracaoFilme);
                this.anoDeLancamento = anoDeLancamento;
                this.titulo = titulo;
            }
        }
