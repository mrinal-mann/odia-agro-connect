import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AINoticeBoard({ tempC }: { tempC?: number }) {
  const spoilage = useMemo(() => {
    if (tempC === undefined) return "Stable: 48–72h";
    if (tempC > 10) return "High risk: 12–24h";
    if (tempC > 8) return "Risk: ~24–36h";
    return "Safe: 48–72h";
  }, [tempC]);

  const tip = useMemo(() => (tempC && tempC > 8 ? "Sell sooner to avoid spoilage" : "Hold for better price window"), [tempC]);
  const trend = useMemo(() => (Math.random() > 0.5 ? "↑ Slight uptrend" : "↓ Slight downtrend"), []);

  return (
    <div className="grid sm:grid-cols-3 gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Spoilage ETA</CardTitle>
        </CardHeader>
        <CardContent>{spoilage}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hold vs Sell</CardTitle>
        </CardHeader>
        <CardContent>{tip}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Price Trend</CardTitle>
        </CardHeader>
        <CardContent>{trend}</CardContent>
      </Card>
    </div>
  );
}
