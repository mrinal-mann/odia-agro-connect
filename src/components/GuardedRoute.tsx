import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/lib/types";

export default function GuardedRoute({ role, children }: { role: Role; children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;
  return children;
}
