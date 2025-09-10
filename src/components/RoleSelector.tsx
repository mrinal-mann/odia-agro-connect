import { useLang } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const roles = [
  {
    key: "FARMER",
    icon: "👨‍🌾",
    tKey: "roleFarmer",
    path: "/auth?role=FARMER",
  },
  {
    key: "HUB",
    icon: "📊",
    tKey: "roleHub",
    path: "/auth?role=HUB",
  },
  {
    key: "BUYER",
    icon: "🧺",
    tKey: "roleBuyer",
    path: "/auth?role=BUYER",
  },
] as const;

export default function RoleSelector() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold">O-Fresh</div>
        <nav className="flex items-center gap-8">
          <Link to="#" className="hover:text-gray-300 transition-colors">
            Problem
          </Link>
          <Link to="#" className="hover:text-gray-300 transition-colors">
            Solution
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-8">
        <h1 className="text-4xl font-bold mb-12 text-center">Login As</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          {roles.map((role) => (
            <Link key={role.key} to={role.path} className="block">
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer h-48">
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                  <div className="text-6xl mb-4">{role.icon}</div>
                  <div className="text-lg font-medium text-center">
                    {t(role.tKey)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
