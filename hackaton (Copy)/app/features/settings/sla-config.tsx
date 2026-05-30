import * as React from "react";
import { loadSlaConfig, saveSlaConfig, resetSlaConfig, DEFAULT_SLA_CONFIG } from "~/lib/sla-store";
import type { SlaConfig } from "~/lib/sla-store";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const LABELS: Record<keyof SlaConfig, string> = {
  MERCADO_LIVRE_FULL: "Mercado Livre — FULL (Fulfillment)",
  MERCADO_LIVRE_CROSS_DOCKING: "Mercado Livre — Cross Docking",
  SHOPEE: "Shopee",
  AMAZON_GLOBAL_API: "Amazon",
  NETSHOES: "Netshoes",
  RENNER: "Renner",
  TIKTOK_SHOP: "TikTok Shop",
  DEFAULT: "Padrão (outros marketplaces)",
};

export default function SlaConfigPage() {
  const [config, setConfig] = React.useState<SlaConfig>(loadSlaConfig);
  const [saved, setSaved] = React.useState(false);

  const handleChange = (key: keyof SlaConfig, value: string) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setConfig((prev) => ({ ...prev, [key]: parsed }));
    }
  };

  const handleSave = () => {
    saveSlaConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetSlaConfig();
    setConfig(DEFAULT_SLA_CONFIG);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 lg:px-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuração de SLAs</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Define o prazo máximo de despacho em horas para cada marketplace.
          Valores salvos são preservados entre sessões.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {(Object.keys(LABELS) as Array<keyof SlaConfig>).map((key) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <label className="text-sm font-medium flex-1">{LABELS[key]}</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={240}
                value={config[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-24 text-center"
              />
              <span className="text-sm text-muted-foreground w-8">h</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSave}>
          {saved ? "✓ Salvo!" : "Salvar configurações"}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Restaurar padrões
        </Button>
      </div>

      <div className="rounded-md bg-muted px-4 py-3 text-xs text-muted-foreground">
        ⚠️ Os valores padrão são estimativas. Confirme os SLAs reais com cada marketplace antes de usar em produção.
      </div>
    </div>
  );
}
