"use client";

import { ShieldCheck, Zap, Sliders, Lock, CalendarCheck, Search, Film } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ExtraSections() {
  const advantages = [
    {
      icon: ShieldCheck,
      title: "Verified Acoustic & Light Ratings",
      desc: "Every stage is audited for decibel noise floor, acoustic isolation, and true ambient lux levels before listing.",
    },
    {
      icon: Zap,
      title: "Heavy Duty Power & Cam Rigs",
      desc: "Access three-phase power drops, high-capacity ceiling trusses, and motorized lighting grids ready for big setups.",
    },
    {
      icon: Lock,
      title: "Escrow & Dispute Security",
      desc: "Payouts are securely held until production wrap, ensuring mutual host-creator accountability and zero surprises.",
    },
    {
      icon: Sliders,
      title: "Flexible Hourly Tier Pricing",
      desc: "No long leases or hidden surcharges. Book exactly the shooting blocks you need with transparent hourly rates.",
    },
  ];

  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Find Verified Sets",
      desc: "Filter by cyclorama dimensions, ceiling height, strobe equipment, and neighborhood coordinates.",
    },
    {
      step: "02",
      icon: CalendarCheck,
      title: "Lock Your Time Slot",
      desc: "Choose your shoot window with instant reservation confirmation and transparent equipment add-ons.",
    },
    {
      step: "03",
      icon: Film,
      title: "Roll Camera & Create",
      desc: "Arrive on set with access codes ready, isolated audio booths dialed in, and full creative control.",
    },
  ];

  return (
    <div className="w-full bg-[#090d16] border-t border-white/[0.06] overflow-hidden">
      {/* --- Section 1: The Studio Advantage --- */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Engineered For Creators
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Built To Eliminate{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Production Bottlenecks
            </span>
          </h2>
          <p className="text-sm text-slate-400">
            From independent podcast hosts to feature film crews, StudioSpace provides the verified infrastructure you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-white/[0.08] bg-slate-900/40 p-6 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(34,211,238,0.1)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- Section 2: How It Works Workflow --- */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Streamlined Booking Pipeline
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            From Concept To Call-Sheet In{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Three Simple Steps
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-8 backdrop-blur-md space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-cyan-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-black text-white/10 select-none">
                    {st.step}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{st.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-blue-900/20 via-cyan-900/20 to-slate-900/40 p-8 sm:p-12 text-center space-y-6 backdrop-blur-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to host your next shoot or list an empty stage?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Join hundreds of Dhaka directors, producers, and photographers already utilizing StudioSpace.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              asChild
              className="h-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 text-xs sm:text-sm font-semibold text-white shadow-lg hover:from-blue-500 hover:to-cyan-500"
            >
              <Link href="/studios">Explore All Studios</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/15 bg-white/5 px-6 text-xs sm:text-sm font-semibold text-white hover:bg-white/10"
            >
              <Link href="/dashboard/add-studio">Become a Space Host</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}