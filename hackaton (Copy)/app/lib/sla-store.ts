export interface SlaConfig {
  MERCADO_LIVRE_FULL: number;
  MERCADO_LIVRE_CROSS_DOCKING: number;
  SHOPEE: number;
  AMAZON_GLOBAL_API: number;
  NETSHOES: number;
  RENNER: number;
  TIKTOK_SHOP: number;
  DEFAULT: number;
}

export const DEFAULT_SLA_CONFIG: SlaConfig = {
  MERCADO_LIVRE_FULL: 24,
  MERCADO_LIVRE_CROSS_DOCKING: 48,
  SHOPEE: 72,
  AMAZON_GLOBAL_API: 24,
  NETSHOES: 72,
  RENNER: 72,
  TIKTOK_SHOP: 72,
  DEFAULT: 48,
};

const STORAGE_KEY = 'crocs_sla_config';

export function loadSlaConfig(): SlaConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SLA_CONFIG;
    return { ...DEFAULT_SLA_CONFIG, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SLA_CONFIG;
  }
}

export function saveSlaConfig(config: SlaConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function resetSlaConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}
