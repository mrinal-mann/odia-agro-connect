import { useLang } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Warehouse, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const roles = [
  { key: "FARMER", icon: Sprout, color: "card-gradient-farmer", tKey: "roleFarmer", path: "/auth?role=FARMER" },
  { key: "HUB", icon: Warehouse, color: "card-gradient-hub", tKey: "roleHub", path: "/auth?role=HUB" },
  { key: "BUYER", icon: ShoppingCart, color: "card-gradient-buyer", tKey: "roleBuyer", path: "/auth?role=BUYER" },
] as const;

export default function RoleSelector() {
  const { t } = useLang();
  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">{t("appTitle")}</h1>
        <p className="text-muted-foreground">{t("landingTagline")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roles.map((r) => (
          <Link key={r.key} to={r.path} aria-label={r.key}>
            <Card className="group overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <r.icon className="h-6 w-6" />
                  <span>{t(r.tKey as any)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`h-28 rounded-md ${r.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
