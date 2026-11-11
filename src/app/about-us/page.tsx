"use client";

import Link from "next/link";
import { Sparkles, Building2, Users2, Shield, HeartHandshake, Compass, ArrowRight } from "lucide-react";

export default function AboutUsPage() {
  const stats = [
    { label: "Verified Studios", val: "50+" },
    { label: "Active Creators", val: "1,200+" },
    { label: "Hours Booked", val: "4,800+" },
    { label: "Dhaka Hubs", val: "6 Zones" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Ambient background lights */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10 space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" /> Our Story & Mission
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            About <span className="text-cyan-400">StudioSpace</span>
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Dhaka&apos;s premier Peer-to-Peer creative stage marketplace connecting independent space owners with visionary directors, photographers, and audio artists.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl text-center space-y-1">
              <p className="text-3xl font-black text-cyan-400">{s.val}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Why We Built StudioSpace</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Finding high-end indoor production spaces in Dhaka historically required endless personal inquiries, opaque rate negotiations, and scheduling uncertainties. We built StudioSpace to provide frictionless instant reservations with transparent rates and guaranteed amenities.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-xs text-slate-300">
              Verified stages across Dhanmondi, Banani, Gulshan, Uttara, and Mirpur DOHS.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center justify-center">
                <Users2 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Our Core Commitment</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                We bridge the divide between space hosts and media creators. Hosts maximize their rental returns on empty shooting floors, while creators gain access to industry-standard lights, acoustic treatment, and infinity cyc walls on flexible hourly rates.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/studios"
                className="rounded-xl bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition inline-flex items-center gap-2"
              >
                <Compass className="h-3.5 w-3.5" /> Explore Studios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}