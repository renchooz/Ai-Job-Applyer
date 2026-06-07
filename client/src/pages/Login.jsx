import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { Mail, Lock, Sparkles, Loader2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Login = () => {
  const { user, login, googleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  if (user) {
  return <Navigate to="/dashboard" replace />;
}

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(formData);
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google credential not found");
        return;
      }

      await googleLogin(credentialResponse.credential);
    } catch (error) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-white">
      <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative z-10 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Badge className="mb-5">
            <Sparkles size={14} />
            ApplyPilot AI
          </Badge>

          <h1 className="text-5xl font-bold leading-tight">
            Send smarter job applications with AI.
          </h1>

          <p className="mt-5 max-w-xl text-slate-400">
            Upload resumes, analyze JDs, generate tailored emails, and send
            applications directly from your Gmail.
          </p>

          <div className="mt-8 grid max-w-lg gap-4">
            {[
              "AI selects your best resume",
              "Editable email preview before sending",
              "Gmail OAuth based sending",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <Card className="mx-auto w-full max-w-md">
          <CardContent className="p-6">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
                <Sparkles size={24} />
              </div>

              <h2 className="text-2xl font-bold">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Sign in to continue to ApplyPilot AI
              </p>
            </div>

            <div className="mb-5 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google login failed")}
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
              />
            </div>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500">
                OR
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              New here?{" "}
              <Link
                to="/register"
                className="text-violet-300 hover:text-violet-200"
              >
                Create an account
              </Link>
            </p>

            <Link
              to="/landing"
              className="mt-4 block text-center text-xs text-slate-500 hover:text-slate-300"
            >
              Back to landing page
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;