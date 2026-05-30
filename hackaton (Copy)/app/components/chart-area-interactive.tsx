"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "~/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import type { OrderWithTransmission } from "~/lib/anymarket";

export const description = "An interactive area chart";

interface ChartPoint {
  date: string;
  count: number;
}

const chartConfig = {
  count: {
    label: "Pedidos",
    color: "#81b71a",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ orders }: { orders: OrderWithTransmission[] }) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  const chartData = React.useMemo<ChartPoint[]>(() => {
    const now = new Date();
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - days);

    const grouped = orders
      .filter((order) => {
        const created = order.createdAt ?? order.createdDate ?? new Date().toISOString();
        const createdDate = new Date(created);
        return createdDate >= startDate && createdDate <= now;
      })
      .reduce<Record<string, number>>((acc, order) => {
        const created = order.createdAt ?? order.createdDate ?? new Date().toISOString();
        const date = new Date(created).toISOString().slice(0, 10);
        acc[date] = (acc[date] ?? 0) + 1;
        return acc;
      }, {});

    return Object.entries(grouped)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [orders, timeRange]);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  return (
    <Card className="@container/card">
      <CardHeader>
            <CardTitle>Volume de Pedidos</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Pedidos integrados nos últimos dias
          </span>
          <span className="@[540px]/card:hidden">Pedidos nos últimos dias</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 dias</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 dias</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 dias
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                    offset="5%"
                    stopColor="var(--color-count)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                    stopColor="var(--color-count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                    stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                    stopColor="var(--color-count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-count)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
