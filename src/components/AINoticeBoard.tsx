import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop } from "@/lib/types";

type Props = {
  crop?: Crop;
  hubCode?: string;
  ambient?: { temp: number; humidity: number };
};

interface Reading { ts: number; temp: number; humidity: number }

const BASE_HOURS: Record<Crop, number> = {
  TOMATO: 60,
  ONION: 72,
  OKRA: 48,
};

export default function AINoticeBoard({ crop = "TOMATO", hubCode = "HUB-1", ambient }: Props) {
  const [iot, setIot] = useState<Reading | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      const t = 6 + Math.random() * 6;
      const h = 60 + Math.random() * 20;
      setIot({ ts: Date.now(), temp: Number(t.toFixed(1)), humidity: Math.round(h) });
    }, 5000);
    const t0 = 6 + Math.random() * 6;
    const h0 = 60 + Math.random() * 20;
    setIot({ ts: Date.now(), temp: Number(t0.toFixed(1)), humidity: Math.round(h0) });
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [hubCode]);

  const env = ambient ?? { temp: 30, humidity: 70 };

  const etaHours = useMemo(() => {
    const base = BASE_HOURS[crop];
    const iotTemp = iot?.temp ?? 8;
    let hours = base - (iotTemp - 8) * 6;
    if (iotTemp < 8) hours += (8 - iotTemp) * 3;
    const hum = iot?.humidity ?? 70;
    if (hum > 75) hours -= (hum - 75) * 0.8;
    if (env.temp > 28) hours -= (env.temp - 28) * 0.7;
    hours = Math.max(12, Math.min(72, hours));
    return Math.round(hours);
  }, [crop, iot, env.temp]);

  const etaRange = useMemo(() => {
    const low = Math.max(12, Math.round(etaHours * 0.8));
    const high = Math.min(84, Math.round(etaHours * 1.2));
    return `${low}–${high}h`;
  }, [etaHours]);

  const sellAdvice = useMemo(() => {
    if (etaHours <= 24) return "Book or sell now.";
    if (etaHours <= 36) return "Prefer booking within the next 12 hours.";
    return "Safe to hold for 1 day.";
  }, [etaHours]);

  const priceTrend = useMemo(() => {
    const seed = new Date().getDate() + crop.length;
    const rising = seed % 2 === 0;
    return rising ? "Prices rising in 24h" : "Prices softening in 24–48h";
  }, [crop]);

  const cropLabel = crop === "TOMATO" ? "Tomato" : crop === "ONION" ? "Onion" : "Okra";

  return (
    <div className="grid sm:grid-cols-3 gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Spoilage ETA</CardTitle>
        </CardHeader>
        <CardContent>
          {cropLabel} at current conditions: ~{etaRange} to risk.
          <div className="mt-1 text-xs text-muted-foreground">
            IoT {hubCode}: {iot?.temp ?? "-"}°C / {iot?.humidity ?? "-"}% • Ambient: {env.temp}°C
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hold vs Sell</CardTitle>
        </CardHeader>
        <CardContent>{sellAdvice}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Price Trend</CardTitle>
        </CardHeader>
        <CardContent>{priceTrend}</CardContent>
      </Card>
    </div>
  );
}

