import * as React from "react";
import { OrdersList } from "~/features/orders/orders-list";
import { fetchOrdersDashboard } from "~/lib/anymarket";
import type { OrderWithTransmission } from "~/lib/anymarket";
import { analyzeOrder } from "~/lib/decision-engine";

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

function notifyNewCritical(orders: OrderWithTransmission[], previousIds: Set<string>) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const newCritical = orders.filter((o) => {
    const decision = analyzeOrder(o);
    return decision.color === "destructive" && !previousIds.has(o.id);
  });

  if (newCritical.length === 0) return;

  if (newCritical.length === 1) {
    const o = newCritical[0];
    const decision = analyzeOrder(o);
    const canal = o.marketPlace ?? o.marketPlaceUrl ?? "Marketplace";
    new Notification("⚠️ Pedido atrasado — ação imediata necessária", {
      body: `${canal} · ${o.buyer?.name ?? o.marketPlaceNumber ?? o.id} · ${decision.label}`,
      icon: "/favicon.ico",
    });
  } else {
    new Notification(`⚠️ ${newCritical.length} pedidos atrasados`, {
      body: "Acesse a Torre de Controle para despachar com urgência.",
      icon: "/favicon.ico",
    });
  }
}

function toInputDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function toStartOfDay(dateStr: string): Date {
  return new Date(dateStr + "T00:00:00");
}

function toEndOfDay(dateStr: string): Date {
  return new Date(dateStr + "T23:59:59.999");
}

export default function OrdersPage() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [dateStart, setDateStart] = React.useState(toInputDate(thirtyDaysAgo));
  const [dateEnd, setDateEnd] = React.useState(toInputDate(now));
  const [orders, setOrders] = React.useState<OrderWithTransmission[]>([]);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const criticalIdsRef = React.useRef<Set<string>>(new Set());

  const loadOrders = React.useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    const data = await fetchOrdersDashboard({
      dateStart: toStartOfDay(dateStart),
      dateEnd: toEndOfDay(dateEnd),
    });

    notifyNewCritical(data, criticalIdsRef.current);
    criticalIdsRef.current = new Set(
      data.filter((o) => analyzeOrder(o).color === "destructive").map((o) => o.id),
    );

    setOrders(data);
    setLastUpdated(new Date());
    if (!silent) setIsLoading(false);
  }, [dateStart, dateEnd]);

  React.useEffect(() => {
    requestNotificationPermission();
    loadOrders(false);
    const interval = setInterval(() => loadOrders(true), 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadOrders]);

  const lastUpdatedText = lastUpdated
    ? `Atualizado às ${lastUpdated.toLocaleTimeString("pt-BR")}`
    : "Carregando...";

  const notificationBlocked =
    typeof window !== "undefined" &&
    "Notification" in window &&
    Notification.permission === "denied";

  const criticalCount = React.useMemo(
    () => orders.filter((o) => analyzeOrder(o).color === "destructive").length,
    [orders],
  );

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Torre de Controle Logística
            </h1>
            <p className="text-muted-foreground">
              Monitoramento de prazos de despacho por marketplace
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">
                Período inicial
              </label>
              <input
                type="date"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={dateStart}
                max={dateEnd}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">
                Período final
              </label>
              <input
                type="date"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={dateEnd}
                min={dateStart}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
            <button
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              onClick={() => loadOrders(false)}
              disabled={isLoading}
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground">{lastUpdatedText}</p>
            {notificationBlocked && (
              <p className="text-xs text-red-500">
                ⚠️ Notificações bloqueadas — habilite nas configurações do navegador
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Banner minimalista — apenas borda, sem fundo forte */}
      {criticalCount > 0 && !isLoading && (
        <div className="mx-4 lg:mx-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 flex items-center gap-3">
          <span className="text-red-500 text-base">⚠️</span>
          <div>
            <p className="text-red-700 font-medium text-sm">
              {criticalCount} {criticalCount === 1 ? "pedido atrasado" : "pedidos atrasados"} — despacho imediato necessário
            </p>
            <p className="text-red-500 text-xs">
              SLA vencido. Verifique a tabela abaixo.
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-muted-foreground text-sm text-center py-12">
          Carregando pedidos...
        </div>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  );
}