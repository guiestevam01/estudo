#!/usr/bin/env python3
"""Da frase "o gato dorme" ate o input embedding de um Transformer moderno.

Este arquivo mostra, de forma detalhada, as etapas que acontecem ANTES da
primeira camada de atencao:

    texto
      -> tokenizacao em subtokens
      -> IDs inteiros
      -> attention_mask
      -> position_ids
      -> consulta da tabela nn.Embedding
      -> inputs_embeds

O exemplo segue o desenho de um decoder moderno da familia Qwen3:

* usa um tokenizador subword real (Qwen/Qwen3-0.6B-Base);
* a tabela de embeddings comeca aleatoria, com N(0, 0.02^2);
* a informacao de posicao usa RoPE e, portanto, NAO e somada aos vetores aqui;
* os position_ids sao preparados agora para serem usados depois em Q e K.

IMPORTANTE
----------
Os vetores criados neste exemplo ainda nao "sabem" o significado de gato ou
dormir. Eles so adquirem significado durante o treinamento, quando o gradiente
ajusta as linhas da tabela de embeddings.

Instalacao:

    python -m pip install "torch>=2.3" "transformers>=4.51"

Execucao leve (recomendada para estudar):

    python input_embedding_o_gato_dorme.py

Geometria original do Qwen3-0.6B (1024 numeros por token; usa mais memoria):

    python input_embedding_o_gato_dorme.py --dimensao-original

Outro texto ou um lote de textos:

    python input_embedding_o_gato_dorme.py \
        --texto "o gato dorme" "a gata corre"

Observacao: apenas o tokenizador e a configuracao sao baixados. Os pesos de
1,2 GB do modelo Qwen3 nao sao baixados, pois estamos demonstrando a criacao
da tabela no inicio de um treinamento, antes de ela ser aprendida.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from typing import Any, Sequence

try:
    import torch
    from torch import Tensor, nn
except ModuleNotFoundError as exc:  # mensagem mais amigavel para iniciantes
    raise SystemExit(
        "PyTorch nao esta instalado. Execute:\n"
        '  python -m pip install "torch>=2.3" "transformers>=4.51"'
    ) from exc


MODELO_PADRAO = "Qwen/Qwen3-0.6B-Base"
TEXTO_PADRAO = "o gato dorme"


@dataclass(frozen=True)
class LoteTokenizado:
    """Tensores que saem do tokenizador e entram no modulo de embedding."""

    textos: tuple[str, ...]
    tokens: tuple[tuple[str, ...], ...]
    input_ids: Tensor
    attention_mask: Tensor
    position_ids: Tensor


@dataclass(frozen=True)
class SaidaEmbedding:
    """Resultado da busca dos IDs na matriz de embeddings."""

    input_ids: Tensor
    attention_mask: Tensor
    position_ids: Tensor
    inputs_embeds: Tensor


class InputEmbeddingModerno(nn.Module):
    """Camada de token embedding no estilo de um decoder moderno com RoPE.

    A matriz possui formato:

        [quantidade_de_tokens_no_vocabulario, dimensao_do_vetor]

    Cada ID funciona como o numero de uma linha. Se o ID for 45, por exemplo,
    ``self.embed_tokens.weight[45]`` devolve o vetor armazenado na linha 45.

    Nao ha uma soma com embedding posicional neste modulo. Em arquiteturas
    atuais como Qwen3, RoPE usa ``position_ids`` mais tarde para rotacionar
    Query e Key dentro da atencao.
    """

    def __init__(
        self,
        vocab_size: int,
        d_model: int,
        initializer_range: float = 0.02,
        *,
        device: torch.device,
        dtype: torch.dtype,
    ) -> None:
        super().__init__()

        if vocab_size <= 0:
            raise ValueError("vocab_size precisa ser positivo")
        if d_model <= 0:
            raise ValueError("d_model precisa ser positivo")
        if initializer_range <= 0:
            raise ValueError("initializer_range precisa ser positivo")

        self.vocab_size = vocab_size
        self.d_model = d_model
        self.initializer_range = initializer_range

        # A tabela inteira e um unico parametro treinavel.
        # Nao usamos padding_idx aqui porque o tokenizador pode reutilizar EOS
        # como PAD; congelar essa linha tambem congelaria o EOS verdadeiro.
        self.embed_tokens = nn.Embedding(
            num_embeddings=vocab_size,
            embedding_dim=d_model,
            device=device,
            dtype=dtype,
        )

        self.reset_parameters()

    @torch.no_grad()
    def reset_parameters(self) -> None:
        """Preenche TODAS as celulas sorteando uma Normal de media 0.

        Para cada celula x da matriz:

            z ~ N(0, 1)
            x = 0 + initializer_range * z

        Com initializer_range=0.02, a maior parte dos valores fica perto de
        zero. Isso e apenas o ponto de partida; o treinamento os modifica.
        """

        nn.init.normal_(
            self.embed_tokens.weight,
            mean=0.0,
            std=self.initializer_range,
        )

    def forward(
        self,
        input_ids: Tensor,
        attention_mask: Tensor,
        position_ids: Tensor,
    ) -> SaidaEmbedding:
        """Troca cada ID pela linha correspondente da tabela.

        Entrada:
            input_ids:      [batch, sequencia]
            attention_mask: [batch, sequencia]
            position_ids:   [batch, sequencia]

        Saida:
            inputs_embeds:  [batch, sequencia, d_model]
        """

        self._validar_entradas(input_ids, attention_mask, position_ids)

        # Esta e a operacao central da etapa inteira.
        # Matematicamente: inputs_embeds[b, t] = W[input_ids[b, t]]
        inputs_embeds = self.embed_tokens(input_ids)

        return SaidaEmbedding(
            input_ids=input_ids,
            attention_mask=attention_mask,
            position_ids=position_ids,
            inputs_embeds=inputs_embeds,
        )

    def _validar_entradas(
        self,
        input_ids: Tensor,
        attention_mask: Tensor,
        position_ids: Tensor,
    ) -> None:
        if input_ids.dtype != torch.long:
            raise TypeError("input_ids precisa ter dtype torch.long")
        if input_ids.ndim != 2:
            raise ValueError("input_ids precisa ter formato [batch, sequencia]")
        if attention_mask.shape != input_ids.shape:
            raise ValueError("attention_mask deve ter o mesmo formato de input_ids")
        if position_ids.shape != input_ids.shape:
            raise ValueError("position_ids deve ter o mesmo formato de input_ids")
        if input_ids.numel() == 0:
            raise ValueError("o lote nao pode estar vazio")

        menor_id = int(input_ids.min().item())
        maior_id = int(input_ids.max().item())
        if menor_id < 0 or maior_id >= self.vocab_size:
            raise IndexError(
                f"IDs devem estar entre 0 e {self.vocab_size - 1}; "
                f"recebi o intervalo [{menor_id}, {maior_id}]"
            )


def importar_transformers() -> tuple[Any, Any]:
    """Importa Transformers somente quando o tokenizador for carregado."""

    try:
        from transformers import AutoConfig, AutoTokenizer
    except ModuleNotFoundError as exc:
        raise SystemExit(
            "Transformers nao esta instalado. Execute:\n"
            '  python -m pip install "torch>=2.3" "transformers>=4.51"'
        ) from exc
    return AutoConfig, AutoTokenizer


def carregar_tokenizador_e_config(modelo: str) -> tuple[Any, Any]:
    """Carrega arquivos pequenos do tokenizador/config, nao os pesos do LLM."""

    AutoConfig, AutoTokenizer = importar_transformers()

    config = AutoConfig.from_pretrained(
        modelo,
        trust_remote_code=False,
    )
    tokenizer = AutoTokenizer.from_pretrained(
        modelo,
        use_fast=True,
        trust_remote_code=False,
    )

    # Tokenizadores decoder-only muitas vezes nao declaram um PAD separado.
    # Para formar lotes, e comum reutilizar EOS como o simbolo de preenchimento.
    # attention_mask continuara dizendo quais posicoes sao texto (1) ou PAD (0).
    if tokenizer.pad_token_id is None:
        if tokenizer.eos_token_id is None:
            raise RuntimeError("o tokenizador nao possui pad_token nem eos_token")
        tokenizer.pad_token = tokenizer.eos_token

    tokenizer.padding_side = "right"
    return tokenizer, config


def criar_position_ids(attention_mask: Tensor) -> Tensor:
    """Cria posicoes 0, 1, 2... ignorando espacos de padding.

    Exemplo:
        attention_mask = [1, 1, 1, 0, 0]
        position_ids   = [0, 1, 2, 0, 0]

    Os zeros nas posicoes PAD sao irrelevantes, porque a mascara impedira que
    essas posicoes participem da atencao.
    """

    position_ids = attention_mask.to(torch.long).cumsum(dim=-1) - 1
    return position_ids.masked_fill(attention_mask == 0, 0)


def tokenizar(
    tokenizer: Any,
    textos: Sequence[str],
    *,
    max_length: int,
    device: torch.device,
) -> LoteTokenizado:
    """Converte textos em IDs, mascara e posicoes, prontos para o PyTorch."""

    if not textos or any(not texto.strip() for texto in textos):
        raise ValueError("forneca pelo menos um texto nao vazio")

    codificado = tokenizer(
        list(textos),
        add_special_tokens=False,
        padding=True,
        truncation=True,
        max_length=max_length,
        return_attention_mask=True,
        return_tensors="pt",
    )

    input_ids = codificado["input_ids"].to(device=device, dtype=torch.long)
    attention_mask = codificado["attention_mask"].to(
        device=device,
        dtype=torch.long,
    )
    position_ids = criar_position_ids(attention_mask)

    # Guardamos apenas tokens reais na versao legivel; PAD fica nos tensores.
    tokens_legiveis: list[tuple[str, ...]] = []
    for ids_linha, mascara_linha in zip(input_ids.cpu(), attention_mask.cpu()):
        ids_reais = ids_linha[mascara_linha.bool()].tolist()
        tokens_legiveis.append(
            tuple(tokenizer.convert_ids_to_tokens(ids_reais))
        )

    return LoteTokenizado(
        textos=tuple(textos),
        tokens=tuple(tokens_legiveis),
        input_ids=input_ids,
        attention_mask=attention_mask,
        position_ids=position_ids,
    )


def escolher_device(nome: str) -> torch.device:
    if nome != "auto":
        device = torch.device(nome)
        if device.type == "cuda" and not torch.cuda.is_available():
            raise RuntimeError("CUDA foi pedido, mas nao esta disponivel")
        if device.type == "mps" and not torch.backends.mps.is_available():
            raise RuntimeError("MPS foi pedido, mas nao esta disponivel")
        return device

    if torch.cuda.is_available():
        return torch.device("cuda")
    if torch.backends.mps.is_available():
        return torch.device("mps")
    return torch.device("cpu")


def escolher_dtype(nome: str, device: torch.device) -> torch.dtype:
    mapa = {
        "float32": torch.float32,
        "bfloat16": torch.bfloat16,
        "float16": torch.float16,
    }
    dtype = mapa[nome]

    if device.type == "cpu" and dtype == torch.float16:
        raise ValueError(
            "float16 em CPU nao e uma boa escolha; use float32 ou bfloat16"
        )
    return dtype


def formatar_vetor(vetor: Tensor, limite: int) -> str:
    """Mostra o comeco do vetor sem imprimir centenas de numeros."""

    valores = vetor.detach().float().cpu().tolist()
    exibidos = ", ".join(f"{valor:+.6f}" for valor in valores[:limite])
    sufixo = ", ..." if len(valores) > limite else ""
    return f"[{exibidos}{sufixo}]"


def explicar_resultado(
    tokenizer: Any,
    lote: LoteTokenizado,
    saida: SaidaEmbedding,
    camada: InputEmbeddingModerno,
    *,
    modelo: str,
    limite_vetor: int,
) -> None:
    """Imprime uma leitura guiada de cada tensor e confere o lookup."""

    print("\n" + "=" * 76)
    print("DA FRASE AO INPUT EMBEDDING")
    print("=" * 76)
    print(f"Tokenizador: {modelo}")
    print(f"Tamanho da tabela: {camada.vocab_size:,} linhas")
    print(f"Numeros por vetor (d_model): {camada.d_model}")
    print(f"Inicializacao: N(0, {camada.initializer_range}^2)")
    print(f"Device: {saida.inputs_embeds.device}")
    print(f"Dtype: {saida.inputs_embeds.dtype}")

    for indice_lote, texto in enumerate(lote.textos):
        print("\n" + "-" * 76)
        print(f'TEXTO {indice_lote}: "{texto}"')
        print("-" * 76)

        ids = lote.input_ids[indice_lote]
        mascara = lote.attention_mask[indice_lote]
        posicoes = lote.position_ids[indice_lote]
        vetores = saida.inputs_embeds[indice_lote]

        print(f"Tokens reais: {list(lote.tokens[indice_lote])}")
        print(f"input_ids:      {ids.detach().cpu().tolist()}")
        print(f"attention_mask: {mascara.detach().cpu().tolist()}")
        print(f"position_ids:   {posicoes.detach().cpu().tolist()}")

        print("\nBusca linha por linha:")
        for posicao in range(ids.shape[0]):
            token_id = int(ids[posicao].item())
            e_token_real = bool(mascara[posicao].item())
            token = tokenizer.convert_ids_to_tokens(token_id)
            rotulo = repr(token) if e_token_real else "<PAD>"

            # Prova de que embedding(ID) e exatamente a linha W[ID].
            linha_direta = camada.embed_tokens.weight[token_id]
            vetor_da_saida = vetores[posicao]
            lookup_correto = torch.equal(linha_direta, vetor_da_saida)

            print(
                f"  posicao {int(posicoes[posicao].item()):>2} | "
                f"token {rotulo:<18} | ID {token_id:>6} | "
                f"W[{token_id}] == saida? {lookup_correto}"
            )
            print(f"      {formatar_vetor(vetor_da_saida, limite_vetor)}")

    print("\n" + "-" * 76)
    print("FORMATO FINAL")
    print("-" * 76)
    print(f"inputs_embeds.shape = {tuple(saida.inputs_embeds.shape)}")
    print("Leitura: [quantidade de frases, quantidade de tokens, numeros por token]")
    print("\nNeste ponto termina o INPUT EMBEDDING.")
    print(
        "A seguir, o Transformer cria Q, K e V. RoPE usara position_ids para "
        "aplicar posicao em Q e K dentro da self-attention."
    )


def estimar_memoria_mib(vocab_size: int, d_model: int, dtype: torch.dtype) -> float:
    bytes_por_numero = torch.empty((), dtype=dtype).element_size()
    return vocab_size * d_model * bytes_por_numero / (1024**2)


def criar_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            'Tokeniza "o gato dorme" e cria seu input embedding com PyTorch.'
        )
    )
    parser.add_argument(
        "--texto",
        nargs="+",
        default=[TEXTO_PADRAO],
        help='um ou mais textos; padrao: "o gato dorme"',
    )
    parser.add_argument(
        "--modelo",
        default=MODELO_PADRAO,
        help=f"tokenizador/configuracao; padrao: {MODELO_PADRAO}",
    )
    parser.add_argument(
        "--d-model",
        type=int,
        default=128,
        help="dimensao didatica do vetor; padrao: 128",
    )
    parser.add_argument(
        "--dimensao-original",
        action="store_true",
        help="usa hidden_size da configuracao real do modelo (1024 no Qwen3-0.6B)",
    )
    parser.add_argument(
        "--max-length",
        type=int,
        default=64,
        help="limite de tokens por texto; padrao: 64",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=42,
        help="semente da inicializacao aleatoria; padrao: 42",
    )
    parser.add_argument(
        "--device",
        default="auto",
        help='auto, cpu, cuda ou mps; padrao: "auto"',
    )
    parser.add_argument(
        "--dtype",
        choices=("float32", "bfloat16", "float16"),
        default="float32",
        help="precisao dos embeddings; padrao: float32",
    )
    parser.add_argument(
        "--mostrar",
        type=int,
        default=8,
        help="quantos numeros exibir de cada vetor; padrao: 8",
    )
    return parser


def main() -> None:
    args = criar_parser().parse_args()
    if args.d_model <= 0:
        raise SystemExit("--d-model precisa ser positivo")
    if args.max_length <= 0:
        raise SystemExit("--max-length precisa ser positivo")
    if args.mostrar <= 0:
        raise SystemExit("--mostrar precisa ser positivo")

    device = escolher_device(args.device)
    dtype = escolher_dtype(args.dtype, device)

    # A semente torna a demonstracao repetivel. Em treinamento real, cada
    # execucao distribuida trata sementes por processo/dispositivo.
    torch.manual_seed(args.seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(args.seed)

    print("Carregando apenas tokenizador e configuracao...")
    tokenizer, config = carregar_tokenizador_e_config(args.modelo)

    # len(tokenizer) inclui eventuais tokens adicionados. config.vocab_size e o
    # numero esperado pela arquitetura. max() garante que todo ID seja valido.
    vocab_size = max(len(tokenizer), int(config.vocab_size))
    d_model = int(config.hidden_size) if args.dimensao_original else args.d_model
    sigma = float(getattr(config, "initializer_range", 0.02))

    memoria_mib = estimar_memoria_mib(vocab_size, d_model, dtype)
    print(
        f"Criando W_embed[{vocab_size:,}, {d_model}] "
        f"(~{memoria_mib:.1f} MiB, somente os pesos)..."
    )

    camada = InputEmbeddingModerno(
        vocab_size=vocab_size,
        d_model=d_model,
        initializer_range=sigma,
        device=device,
        dtype=dtype,
    )

    lote = tokenizar(
        tokenizer,
        args.texto,
        max_length=args.max_length,
        device=device,
    )

    # inference_mode e usado porque esta execucao apenas inspeciona o resultado.
    # Durante treinamento, remova-o para que o autograd calcule gradientes.
    camada.eval()
    with torch.inference_mode():
        saida = camada(
            input_ids=lote.input_ids,
            attention_mask=lote.attention_mask,
            position_ids=lote.position_ids,
        )

    explicar_resultado(
        tokenizer,
        lote,
        saida,
        camada,
        modelo=args.modelo,
        limite_vetor=args.mostrar,
    )


if __name__ == "__main__":
    main()
