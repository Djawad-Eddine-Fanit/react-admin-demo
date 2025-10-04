import * as React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip as RTooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Area,
} from "recharts";
import DashboardCard from "@/features/dashboard/components/DashboardCard";

interface BaseChartCardProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
    height?: number;
}

function ChartCard({ title, description, actions, children, height = 240 }: BaseChartCardProps) {
    return (
        <DashboardCard title={title}>
            {description && <p className="text-sm text-muted-foreground -mt-2">{description}</p>}
            <div style={{ width: "100%", height }} className="relative">
                {children}
            </div>
            {actions && <div className="flex justify-end pt-2">{actions}</div>}
        </DashboardCard>
    );
}

// Pie
interface PieChartCardProps {
    title: string;
    data: { name: string; value: number }[];
    colors?: string[];
    description?: string;
    totalLabel?: string;
}

export function PieChartCard({ title, data, colors = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"], description, totalLabel = "Total" }: PieChartCardProps) {
    const total = data.reduce((a, b) => a + b.value, 0);
    return (
        <ChartCard title={title} description={description}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                        {data.map((_, i) => (<Cell key={i} fill={colors[i % colors.length]} />))}
                    </Pie>
                    <RTooltip formatter={(value: any, _name: any, p: any) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, p.payload.name]} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <p className="text-xs text-muted-foreground">{totalLabel}</p>
                    <p className="font-semibold tabular-nums text-lg">{total}</p>
                </div>
            </div>
        </ChartCard>
    );
}

// Bar
interface BarChartCardProps {
    title: string;
    data: any[];
    dataKey: string;
    categoryKey: string;
    description?: string;
    stacked?: boolean;
    series?: { key: string; fill?: string }[]; // for stacked bars
}

export function BarChartCard({ title, data, dataKey, categoryKey, description, stacked = false, series }: BarChartCardProps) {
    return (
        <ChartCard title={title} description={description}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={categoryKey} />
                    <YAxis />
                    <RTooltip />
                    <Legend />
                    {stacked && series ? (
                        series.map(s => <Bar key={s.key} dataKey={s.key} stackId="a" fill={s.fill || "#3b82f6"} />)
                    ) : (
                        <Bar dataKey={dataKey} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    )}
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

// Line / Area combo
interface LineChartCardProps {
  title: string;
  data: any[];
  lines: {
    key: string;
    stroke?: string;
    type?: "monotone" | "linear" | "basis" | "natural" | "step" | "stepBefore" | "stepAfter";
  }[];
  description?: string;
  areaKey?: string;
  xKey?: string; // <-- add this
}

export function LineChartCard({ title, data, lines, description, areaKey, xKey = "name" }: LineChartCardProps) {
  return (
    <ChartCard title={title} description={description}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} /> {/* <-- use dynamic X-axis */}
          <YAxis />
          <RTooltip />
          <Legend />
          {areaKey && (
            <Area
              dataKey={areaKey}
              type="monotone"
              fill="#3b82f6"
              stroke="#3b82f6"
              fillOpacity={0.15}
            />
          )}
          {lines.map((l) => (
            <Line
              key={l.key}
              type={l.type ?? "monotone"}
              dataKey={l.key}
              stroke={l.stroke || "#3b82f6"}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}


export { ChartCard };
