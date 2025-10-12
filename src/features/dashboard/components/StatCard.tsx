import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatCardProps } from "@/types/props";


export function StatCard({ label, value, delta, helpText }: StatCardProps) {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        {delta && <p className="text-sm text-green-600">{delta}</p>}
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
      </CardContent>
    </Card>
  );
}
