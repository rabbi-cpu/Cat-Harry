"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { Sparkles, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    google?: any;
  }
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleGoogleCredentialResponse = async (response: any) => {
    setGoogleLoading(true);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (res.ok && data.user) {
        toast.success(`Welcome back, ${data.user.name}!`);
        localStorage.setItem("studiospace_user", JSON.stringify(data.user));

        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") || "/";
        window.location.href = callbackUrl;
      } else {
        toast.error(data.message || "Google Sign-In failed");
      }
    } catch {
      toast.error("Network error during Google Sign-In");
    } finally {
      setGoogleLoading(false);
    }
  };

  const initializeGoogle = () => {
    if (window.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginDiv"),
        {
          theme: "filled_black",
          size: "large",
          width: "100%",
          text: "continue_with",
          shape: "pill",
        }
      );
    }
  };

  useEffect(() => {
    initializeGoogle();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Welcome back, ${data.user?.name || "Creator"}!`);
        if (typeof window !== "undefined" && data.user) {
          localStorage.setItem("studiospace_user", JSON.stringify(data.user));
        }
        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") || "/";
        window.location.href = callbackUrl;
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-2xl shadow-2xl relative z-10">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-md shadow-cyan-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white">
                Studio<span className="text-cyan-400">Space</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-white">Sign In to Account</h1>
            <p className="text-xs text-slate-400">Enter your credentials or continue with Google below</p>
          </div>

          {/* Standard Email Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 py-3.5 text-xs font-bold text-slate-950 transition shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center pt-1">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-slate-900/90 px-3 text-[11px] uppercase tracking-wider text-slate-500 shrink-0">
              Or continue with
            </span>
            <div className="border-t border-white/10 w-full" />
          </div>

          {/* Google Button Placed at Bottom */}
          <div className="space-y-2">
            <div id="googleLoginDiv" className="w-full flex justify-center min-h-[44px]"></div>
            {googleLoading && (
              <p className="text-center text-xs text-cyan-400 flex items-center justify-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Verifying Google Account...
              </p>
            )}
          </div>

          <div className="text-center pt-1 border-t border-white/5">
            <p className="text-xs text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-cyan-400 font-semibold hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}