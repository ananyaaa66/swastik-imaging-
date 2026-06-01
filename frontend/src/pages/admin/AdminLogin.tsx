import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Activity, AlertCircle } from "lucide-react";
import { loginAdmin, registerAdmin } from "@/lib/api";
import { setToken } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      if (isRegisterMode) {
        const result = await registerAdmin(data.username, data.password);
        // Registration returns token too
        if ((result as any).access_token) {
          setToken((result as any).access_token);
          navigate("/admin/dashboard");
          return;
        }
        setIsRegisterMode(false);
        setError("");
      } else {
        const result = await loginAdmin(data.username, data.password);
        setToken(result.access_token);
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      const msg = err?.message || "An error occurred";
      if (msg.includes("Invalid username") && !isRegisterMode) {
        setError(msg + ". If this is your first time, click 'Register' below.");
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-medical-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-medical-primary shadow-lg shadow-medical-primary/25 mb-4">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Swastik Medscan</h1>
          <p className="text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        <Card className="shadow-xl border-gray-200/60">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">
              {isRegisterMode ? "Create Admin Account" : "Sign In"}
            </CardTitle>
            <CardDescription>
              {isRegisterMode
                ? "Set up your admin credentials"
                : "Enter your credentials to access the dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin"
                          autoComplete="username"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="current-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-medical-primary hover:bg-medical-secondary text-white py-2.5 rounded-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isRegisterMode ? "Creating Account..." : "Signing In..."}
                    </>
                  ) : isRegisterMode ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setError("");
                }}
                className="text-sm text-medical-primary hover:text-medical-secondary font-medium transition-colors"
              >
                {isRegisterMode
                  ? "Already have an account? Sign In"
                  : "First time? Register Admin"}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          Swastik Imaging & Diagnostics — Admin Panel
        </p>
      </div>
    </div>
  );
}
