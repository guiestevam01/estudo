"""Testes unitarios da etapa de input embedding.

Os testes usam tensores pequenos e nao carregam o tokenizador nem acessam a
internet. Assim, verificam diretamente os conceitos centrais do estudo.
"""

import unittest

import torch

from input_embedding_o_gato_dorme import (
    InputEmbeddingModerno,
    criar_position_ids,
)


class TestInputEmbeddingModerno(unittest.TestCase):
    """Valida o lookup e o contrato de entrada da camada."""

    def setUp(self) -> None:
        torch.manual_seed(42)
        self.camada = InputEmbeddingModerno(
            vocab_size=10,
            d_model=4,
            initializer_range=0.02,
            device=torch.device("cpu"),
            dtype=torch.float32,
        )

    def test_cada_id_seleciona_exatamente_uma_linha_da_tabela(self) -> None:
        input_ids = torch.tensor([[2, 5, 2]], dtype=torch.long)
        attention_mask = torch.ones_like(input_ids)
        position_ids = criar_position_ids(attention_mask)

        saida = self.camada(input_ids, attention_mask, position_ids)

        torch.testing.assert_close(
            saida.inputs_embeds[0, 0],
            self.camada.embed_tokens.weight[2],
        )
        torch.testing.assert_close(
            saida.inputs_embeds[0, 1],
            self.camada.embed_tokens.weight[5],
        )
        torch.testing.assert_close(
            saida.inputs_embeds[0, 0],
            saida.inputs_embeds[0, 2],
        )

    def test_saida_acrescenta_a_dimensao_do_embedding(self) -> None:
        input_ids = torch.tensor([[1, 2, 3], [4, 5, 6]], dtype=torch.long)
        attention_mask = torch.ones_like(input_ids)
        position_ids = criar_position_ids(attention_mask)

        saida = self.camada(input_ids, attention_mask, position_ids)

        self.assertEqual(saida.inputs_embeds.shape, (2, 3, 4))
        self.assertEqual(saida.input_ids.shape, (2, 3))

    def test_mesma_semente_reproduz_a_inicializacao(self) -> None:
        pesos_atuais = self.camada.embed_tokens.weight.detach().clone()

        torch.manual_seed(42)
        outra_camada = InputEmbeddingModerno(
            vocab_size=10,
            d_model=4,
            initializer_range=0.02,
            device=torch.device("cpu"),
            dtype=torch.float32,
        )

        torch.testing.assert_close(
            pesos_atuais,
            outra_camada.embed_tokens.weight,
        )

    def test_rejeita_input_ids_com_dtype_incorreto(self) -> None:
        input_ids = torch.tensor([[1.0, 2.0]])
        attention_mask = torch.ones_like(input_ids, dtype=torch.long)
        position_ids = torch.tensor([[0, 1]], dtype=torch.long)

        with self.assertRaisesRegex(TypeError, "dtype torch.long"):
            self.camada(input_ids, attention_mask, position_ids)

    def test_rejeita_id_fora_do_vocabulario(self) -> None:
        input_ids = torch.tensor([[1, 10]], dtype=torch.long)
        attention_mask = torch.ones_like(input_ids)
        position_ids = criar_position_ids(attention_mask)

        with self.assertRaisesRegex(IndexError, "entre 0 e 9"):
            self.camada(input_ids, attention_mask, position_ids)

    def test_rejeita_mascara_com_formato_incompativel(self) -> None:
        input_ids = torch.tensor([[1, 2]], dtype=torch.long)
        attention_mask = torch.tensor([[1]], dtype=torch.long)
        position_ids = torch.tensor([[0, 1]], dtype=torch.long)

        with self.assertRaisesRegex(ValueError, "attention_mask"):
            self.camada(input_ids, attention_mask, position_ids)


class TestPositionIds(unittest.TestCase):
    """Valida a contagem de posicoes para lotes com padding."""

    def test_cria_posicoes_e_zera_padding_a_direita(self) -> None:
        attention_mask = torch.tensor(
            [
                [1, 1, 1, 0, 0],
                [1, 1, 1, 1, 1],
            ],
            dtype=torch.long,
        )

        position_ids = criar_position_ids(attention_mask)

        esperado = torch.tensor(
            [
                [0, 1, 2, 0, 0],
                [0, 1, 2, 3, 4],
            ],
            dtype=torch.long,
        )
        torch.testing.assert_close(position_ids, esperado)


if __name__ == "__main__":
    unittest.main()
