"use client";

import Link from "next/link";
import {
  CalendarCheck2,
  Building2,
  PlusCircle,
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function DashboardHubPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Creator & Host Control Hub
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              StudioSpace Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage your confirmed studio bookings and production listings in one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/add-studio"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 text-xs font-bold transition shadow-lg shadow-cyan-500/20"
            >
              <PlusCircle className="h-4 w-4" />
              List New Studio
            </Link>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: My Bookings */}
          <Link
            href="/dashboard/bookings"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-md hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
                <CalendarCheck2 className="h-6 w-6" />
              </div>
              <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
              My Bookings & Reservations
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              View your scheduled studio sessions, total paid amounts, hourly duration, and reservation receipts.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400">
              Go to Reservations Hub <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Card 2: My Studios */}
          <Link
            href="/dashboard/my-studios"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-md hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-blue-400">
                <Building2 className="h-6 w-6" />
              </div>
              <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
              Host Workspace Manager
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Review published photography sets, podcast bays, edit details, or remove studios from the marketplace.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-400">
              Manage Your Listed Spaces <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Production Safety & Verified Acoustic Compliance</p>
              <p className="text-[11px] text-slate-400">All bookings include zero cancellation fees up to 24 hours prior to set call time.</p>
            </div>
          </div>
          <Link
            href="/studios"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 whitespace-nowrap"
          >
            Explore marketplace &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}