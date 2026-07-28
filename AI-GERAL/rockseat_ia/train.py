"""Fine-tuning de BERT para classificar mensagens como venda ou suporte."""

from __future__ import annotations

import argparse
import json
import random
from pathlib import Path
from typing import Any

LABEL2ID = {"suporte": 0, "venda": 1}
ID2LABEL = {value: key for key, value in LABEL2ID.items()}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Treina e avalia um classificador venda/suporte."
    )
    parser.add_argument("--train-file", type=Path, default=Path("treino.jsonl"))
    parser.add_argument("--test-file", type=Path, default=Path("teste.jsonl"))
    parser.add_argument("--output-dir", type=Path, default=Path("modelo_atendimento"))
    parser.add_argument(
        "--model-name",
        default="neuralmind/bert-base-portuguese-cased",
        help="Modelo de classificação disponível no Hugging Face Hub.",
    )
    parser.add_argument("--epochs", type=float, default=5.0)
    parser.add_argument("--batch-size", type=int, default=8)
    parser.add_argument("--learning-rate", type=float, default=2e-5)
    parser.add_argument("--max-length", type=int, default=128)
    parser.add_argument("--seed", type=int, default=42)
    return parser.parse_args()


def load_jsonl(path: Path) -> list[dict[str, Any]]:
    """Lê e valida um JSONL no formato prompt/completion."""
    if not path.is_file():
        raise FileNotFoundError(
            f"Arquivo não encontrado: {path}. "
            "Copie treino.jsonl e teste.jsonl para o diretório do projeto "
            "ou informe os caminhos pela linha de comando."
        )

    records: list[dict[str, Any]] = []
    with path.open(encoding="utf-8") as file:
        for line_number, raw_line in enumerate(file, start=1):
            line = raw_line.strip()
            if not line:
                continue

            try:
                item = json.loads(line)
            except json.JSONDecodeError as exc:
                raise ValueError(
                    f"{path}, linha {line_number}: JSON inválido ({exc.msg})."
                ) from exc

            if not isinstance(item, dict):
                raise ValueError(
                    f"{path}, linha {line_number}: cada linha deve ser um objeto JSON."
                )

            prompt = item.get("prompt")
            completion = item.get("completion")
            if not isinstance(prompt, str) or not prompt.strip():
                raise ValueError(
                    f"{path}, linha {line_number}: 'prompt' deve ser um texto não vazio."
                )
            if not isinstance(completion, str):
                raise ValueError(
                    f"{path}, linha {line_number}: 'completion' deve ser um texto."
                )

            label = completion.strip().lower()
            if label not in LABEL2ID:
                expected = ", ".join(sorted(LABEL2ID))
                raise ValueError(
                    f"{path}, linha {line_number}: classe '{completion}' inválida; "
                    f"use {expected}."
                )

            records.append({"text": prompt.strip(), "labels": LABEL2ID[label]})

    if not records:
        raise ValueError(f"{path}: o arquivo não contém exemplos válidos.")

    present_labels = {record["labels"] for record in records}
    if len(present_labels) < len(LABEL2ID):
        present_names = ", ".join(ID2LABEL[label] for label in sorted(present_labels))
        raise ValueError(
            f"{path}: é necessário haver exemplos das duas classes; "
            f"encontrada(s): {present_names}."
        )

    return records


def set_seed(seed: int) -> None:
    random.seed(seed)

    import numpy as np
    import torch

    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)


def main() -> None:
    args = parse_args()

    if args.batch_size < 1:
        raise ValueError("--batch-size deve ser maior que zero.")
    if args.max_length < 2:
        raise ValueError("--max-length deve ser pelo menos 2.")
    if args.epochs <= 0:
        raise ValueError("--epochs deve ser maior que zero.")

    try:
        import numpy as np
        import torch
        from datasets import Dataset
        from sklearn.metrics import (
            accuracy_score,
            classification_report,
            confusion_matrix,
            precision_recall_fscore_support,
        )
        from transformers import (
            AutoModelForSequenceClassification,
            AutoTokenizer,
            DataCollatorWithPadding,
            Trainer,
            TrainingArguments,
        )
    except ImportError as exc:
        raise SystemExit(
            "Dependências ausentes. Execute: pip install -r requirements.txt"
        ) from exc

    set_seed(args.seed)
    train_records = load_jsonl(args.train_file)
    test_records = load_jsonl(args.test_file)

    train_dataset = Dataset.from_list(train_records)
    test_dataset = Dataset.from_list(test_records)

    tokenizer = AutoTokenizer.from_pretrained(args.model_name)

    def tokenize(batch: dict[str, list[Any]]) -> dict[str, Any]:
        return tokenizer(
            batch["text"],
            truncation=True,
            max_length=args.max_length,
        )

    tokenized_train = train_dataset.map(
        tokenize,
        batched=True,
        remove_columns=["text"],
        desc="Tokenizando treino",
    )
    tokenized_test = test_dataset.map(
        tokenize,
        batched=True,
        remove_columns=["text"],
        desc="Tokenizando teste",
    )

    model = AutoModelForSequenceClassification.from_pretrained(
        args.model_name,
        num_labels=len(LABEL2ID),
        label2id=LABEL2ID,
        id2label=ID2LABEL,
    )

    def compute_metrics(eval_prediction: Any) -> dict[str, float]:
        logits, labels = eval_prediction
        predictions = np.argmax(logits, axis=-1)
        precision, recall, f1, _ = precision_recall_fscore_support(
            labels,
            predictions,
            average="weighted",
            zero_division=0,
        )
        return {
            "accuracy": accuracy_score(labels, predictions),
            "precision": precision,
            "recall": recall,
            "f1": f1,
        }

    training_args = TrainingArguments(
        output_dir=str(args.output_dir),
        learning_rate=args.learning_rate,
        per_device_train_batch_size=args.batch_size,
        per_device_eval_batch_size=args.batch_size,
        num_train_epochs=args.epochs,
        weight_decay=0.01,
        warmup_ratio=0.1,
        eval_strategy="epoch",
        save_strategy="epoch",
        logging_strategy="steps",
        logging_steps=10,
        load_best_model_at_end=True,
        metric_for_best_model="f1",
        greater_is_better=True,
        save_total_limit=2,
        report_to="none",
        fp16=torch.cuda.is_available(),
        seed=args.seed,
        data_seed=args.seed,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_train,
        eval_dataset=tokenized_test,
        data_collator=DataCollatorWithPadding(tokenizer=tokenizer),
        compute_metrics=compute_metrics,
    )

    trainer.train()
    metrics = trainer.evaluate()

    prediction_output = trainer.predict(tokenized_test)
    predictions = np.argmax(prediction_output.predictions, axis=-1)
    references = np.asarray(test_dataset["labels"])

    print("\nMétricas finais:")
    for name in ("eval_loss", "eval_accuracy", "eval_precision", "eval_recall", "eval_f1"):
        if name in metrics:
            print(f"  {name}: {metrics[name]:.4f}")

    print("\nMatriz de confusão (linhas=reais, colunas=preditas):")
    print(confusion_matrix(references, predictions, labels=[0, 1]))
    print("\nRelatório por classe:")
    print(
        classification_report(
            references,
            predictions,
            labels=[0, 1],
            target_names=[ID2LABEL[0], ID2LABEL[1]],
            zero_division=0,
        )
    )

    args.output_dir.mkdir(parents=True, exist_ok=True)
    trainer.save_model(str(args.output_dir))
    tokenizer.save_pretrained(str(args.output_dir))

    serializable_metrics = {
        key: float(value)
        for key, value in metrics.items()
        if isinstance(value, (int, float, np.integer, np.floating))
    }
    with (args.output_dir / "metricas.json").open("w", encoding="utf-8") as file:
        json.dump(serializable_metrics, file, ensure_ascii=False, indent=2)

    print(f"\nModelo e métricas salvos em: {args.output_dir.resolve()}")


if __name__ == "__main__":
    main()
