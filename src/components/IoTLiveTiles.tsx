import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

interface Reading { ts: number; temp: number; humidity: number }

export default function IoTLiveTiles({ hubCode }: { hubCode: string }) {
  const [data, setData] = useState<Reading[]>([]);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    // simulate stream every 5s
    timer.current = window.setInterval(() => {
      setData((prev) => {
        const t = 6 + Math.random() * 6; // 6–12 C
        const h = 60 + Math.random() * 20; // 60–80%
        const next = [...prev, { ts: Date.now(), temp: Number(t.toFixed(1)), humidity: Math.round(h) }];
        return next.slice(-60);
      });
    }, 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const last = data[data.length - 1];
  const status: "OK" | "WARN" | "ALERT" = useMemo(() => {
    const over8 = data.filter((d) => d.temp > 8).length;
    if (over8 > 120) return "ALERT"; // ~10+ min at 5s cadence
    if (last && last.temp > 8) return "WARN";
    return "OK";
  }, [data, last]);

  const badgeCls = status === "OK" ? "bg-green-500" : status === "WARN" ? "bg-amber-500" : "bg-red-500";

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>IoT: {hubCode}</CardTitle>
        <Badge className={badgeCls}>{status}</Badge>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Temp °C</div>
          <div className="text-2xl font-semibold">{last?.temp ?? "-"}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Humidity %</div>
          <div className="text-2xl font-semibold">{last?.humidity ?? "-"}</div>
        </div>
        <div className="col-span-2 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <YAxis domain={[4, 14]} hide />
              <Tooltip formatter={(v: any) => String(v)} labelFormatter={() => ""} />
              <Line type="monotone" dataKey="temp" stroke={"hsl(var(--primary))"} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
