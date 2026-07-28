"""Executa inferência com o modelo treinado."""

from __future__ import annotations

import argparse
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Classifica uma mensagem como venda ou suporte."
    )
    parser.add_argument("message", help="Mensagem enviada pelo cliente.")
    parser.add_argument(
        "--model-dir",
        type=Path,
        default=Path("modelo_atendimento"),
        help="Diretório gerado pelo treinamento.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if not args.model_dir.is_dir():
        raise SystemExit(
            f"Modelo não encontrado em {args.model_dir}. Execute train.py primeiro."
        )

    try:
        import torch
        from transformers import AutoModelForSequenceClassification, AutoTokenizer
    except ImportError as exc:
        raise SystemExit(
            "Dependências ausentes. Execute: pip install -r requirements.txt"
        ) from exc

    tokenizer = AutoTokenizer.from_pretrained(args.model_dir)
    model = AutoModelForSequenceClassification.from_pretrained(args.model_dir)
    model.eval()

    inputs = tokenizer(
        args.message,
        return_tensors="pt",
        truncation=True,
        max_length=128,
    )
    with torch.inference_mode():
        probabilities = torch.softmax(model(**inputs).logits, dim=-1)[0]

    predicted_id = int(torch.argmax(probabilities).item())
    label = model.config.id2label[predicted_id]
    confidence = float(probabilities[predicted_id].item())
    print(f"classe={label} confiança={confidence:.2%}")


if __name__ == "__main__":
    main()
