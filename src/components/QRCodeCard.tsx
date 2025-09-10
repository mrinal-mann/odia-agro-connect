import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QRCodeCard({ data, title }: { data: string; title?: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title || "Booking QR"}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <div className="bg-card border p-3 rounded-md">
          <QRCode value={data} size={160} />
        </div>
        <code className="text-xs text-muted-foreground break-all">{data}</code>
      </CardContent>
    </Card>
  );
}
