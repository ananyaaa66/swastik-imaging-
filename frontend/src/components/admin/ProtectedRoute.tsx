import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";
import { verifyToken } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    async function check() {
      if (!isAuthenticated()) {
        setStatus("unauthenticated");
        return;
      }

      try {
        await verifyToken();
        setStatus("authenticated");
      } catch {
        setStatus("unauthenticated");
      }
    }
    check();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-medical-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
