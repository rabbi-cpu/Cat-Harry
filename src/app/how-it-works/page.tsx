"use client";

import Link from "next/link";
import { Sparkles, Search, CalendarCheck, Camera, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Discover Verified Studios",
      desc: "Filter through premium daylight rooms, soundproof podcast suites, and infinity cyclorama stages across Dhaka with verified equipment lists.",
      icon: Search,
      color: "from-blue-600 to-cyan-500",
    },
    {
      num: "02",
      title: "Select Schedule & Reserve",
      desc: "Pick your production date, operational hours, and crew size. Transparent hourly rates with zero hidden platform charges.",
      icon: CalendarCheck,
      color: "from-cyan-500 to-teal-400",
    },
    {
      num: "03",
      title: "Shoot & Produce",
      desc: "Step into your reserved studio stage with verified host assistance, power backups, and vanity suites ready for direct filming.",
      icon: Camera,
      color: "from-teal-400 to-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Gradients */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" /> Simple 3-Step Workflow
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            How <span className="text-cyan-400">StudioSpace</span> Works
          </h1>
          <p className="text-sm text-slate-400">
            Effortlessly rent studio sets in Dhaka or monetize your creative workspace with verified protection.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/40 transition duration-300 shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${s.color} flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-3xl font-black text-slate-700 group-hover:text-cyan-400/30 transition">
                      {s.num}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{s.title}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-[11px] font-semibold text-cyan-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Instant Confirmation
                </div>
              </div>
            );
          })}
        </div>

        {/* Host Protection Banner */}
        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 to-slate-950/90 p-8 sm:p-12 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="h-4 w-4" /> Host & Creator Protection
            </div>
            <h3 className="text-2xl font-bold text-white">Have a Studio Space in Dhaka?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monetize your idle production hours. List your space in minutes, set your pricing, and manage incoming reservations directly from your dashboard.
            </p>
          </div>
          <Link
            href="/dashboard/add-studio"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-3.5 text-xs font-bold text-slate-950 transition shadow-lg shadow-cyan-500/20 shrink-0 inline-flex items-center gap-2"
          >
            List Your Studio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}