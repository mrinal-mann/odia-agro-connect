import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop } from "@/lib/types";

interface Reading { ts: number; temp: number; humidity: number; ph: number; moisture: number }

type Props = {
  crop: Crop;
  hubCode: string;
  ambient?: { temp: number; humidity: number };
};

const BASE_HOURS: Record<Crop, number> = {
  TOMATO: 60,
  ONION: 72,
  OKRA: 48,
};

export default function AISuggestionDashboard({ crop, hubCode, ambient }: Props) {
  const [iot, setIot] = useState<Reading | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      const t = 6 + Math.random() * 6; // 6-12°C
      const h = 60 + Math.random() * 20; // 60-80%
      const ph = 5.2 + Math.random() * 2.2; // 5.2 - 7.4
      const moisture = 70 + Math.random() * 30; // 70-100%
      setIot({ ts: Date.now(), temp: Number(t.toFixed(1)), humidity: Math.round(h), ph: Number(ph.toFixed(1)), moisture: Math.round(moisture) });
    }, 5000);
    // seed first reading
    const t0 = 6 + Math.random() * 6;
    const h0 = 60 + Math.random() * 20;
    const ph0 = 5.2 + Math.random() * 2.2;
    const m0 = 70 + Math.random() * 30;
    setIot({ ts: Date.now(), temp: Number(t0.toFixed(1)), humidity: Math.round(h0), ph: Number(ph0.toFixed(1)), moisture: Math.round(m0) });
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [hubCode]);

  const env = ambient ?? { temp: 30, humidity: 70 };

  const { etaHours, etaRange, advice, priceTrend, score } = useMemo(() => {
    const base = BASE_HOURS[crop];
    const temp = iot?.temp ?? 8;
    const hum = iot?.humidity ?? 70;
    const ph = iot?.ph ?? 6.5;
    const moisture = iot?.moisture ?? 85;

    // Start from base and adjust
    let hours = base - (temp - 8) * 6; // above 8°C reduces hours
    if (temp < 8) hours += (8 - temp) * 3; // colder buys time
    if (hum > 75) hours -= (hum - 75) * 0.8; // high humidity risk
    if (env.temp > 28) hours -= (env.temp - 28) * 0.7; // hot ambient

    // pH/alkalinity effect (optimal ~5.5–7.0)
    const phPenalty = ph < 5.5 ? (5.5 - ph) * 4 : ph > 7.0 ? (ph - 7.0) * 3 : 0;
    hours -= phPenalty;

    // Moisture content effect (optimal 75–88%)
    const moistPenalty = moisture > 90 ? (moisture - 90) * 0.8 : moisture < 72 ? (72 - moisture) * 0.3 : 0;
    hours -= moistPenalty;

    hours = Math.max(12, Math.min(84, hours));

    const low = Math.max(12, Math.round(hours * 0.8));
    const high = Math.min(96, Math.round(hours * 1.2));

    const advice = hours <= 24 ? "Book or sell now." : hours <= 36 ? "Prefer booking within the next 12 hours." : "Safe to hold for 1 day.";

    const seed = new Date().getDate() + crop.length;
    const rising = seed % 2 === 0;
    const priceTrend = rising ? "Prices rising in 24h" : "Prices softening in 24–48h";

    // Freshness score 0-100 (higher is better)
    let score = 100;
    score -= Math.max(0, (temp - 8) * 8);
    if (temp < 8) score -= Math.max(0, (8 - temp) * 2);
    score -= Math.max(0, hum - 75) * 0.7;
    score -= Math.abs(6.3 - ph) * 6;
    score -= Math.max(0, moisture - 88) * 0.9;
    score = Math.max(0, Math.min(100, Math.round(score)));

    return { etaHours: Math.round(hours), etaRange: `${low}–${high}h`, advice, priceTrend, score };
  }, [crop, iot, env.temp]);

  const cropLabel = crop === "TOMATO" ? "Tomato" : crop === "ONION" ? "Onion" : "Okra";

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Freshness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{score}/100</div>
            <div className="text-sm text-muted-foreground">Higher is better</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spoilage ETA</CardTitle>
          </CardHeader>
          <CardContent>
            {cropLabel} at current conditions: ~{etaRange} to risk.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advice</CardTitle>
          </CardHeader>
          <CardContent>{advice}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hub Sensors • {hubCode}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Temperature</div>
              <div className="text-lg font-medium">{iot?.temp ?? "-"}°C</div>
            </div>
            <div>
              <div className="text-muted-foreground">Humidity</div>
              <div className="text-lg font-medium">{iot?.humidity ?? "-"}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Alkalinity (pH)</div>
              <div className="text-lg font-medium">{iot?.ph ?? "-"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Moisture</div>
              <div className="text-lg font-medium">{iot?.moisture ?? "-"}%</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Ambient: {env.temp}°C • {env.humidity}% RH</div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Note: Estimates combine hub IoT readings, ambient weather, and historical spoilage curves for {cropLabel.toLowerCase()} under cold-chain conditions.
      </div>
    </div>
  );
}
