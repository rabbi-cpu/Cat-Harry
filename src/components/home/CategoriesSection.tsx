"use client";

import Link from "next/link";
import { Camera, Film, Mic2, Clapperboard, Sparkles, ArrowUpRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  description: string;
  icon: any;
  image: string;
  gradient: string;
}

const categories: CategoryItem[] = [
  {
    id: "photo-studio",
    name: "Photo Studios",
    count: "24+ Spaces",
    description: "Daylight lofts, high-key strobe setups, and editorial backdrops.",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    gradient: "from-blue-600/80 to-cyan-600/80",
  },
  {
    id: "film-production",
    name: "Film Soundstages",
    count: "18+ Stages",
    description: "Motorized overhead grids, acoustic isolation, and drive-in access.",
    icon: Film,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    gradient: "from-indigo-600/80 to-purple-600/80",
  },
  {
    id: "podcast-suite",
    name: "Podcast & Voice Booths",
    count: "30+ Suites",
    description: "Multi-mic Shure SM7B rigs, Blackmagic 4K switchers, and soundproofing.",
    icon: Mic2,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    gradient: "from-amber-600/80 to-rose-600/80",
  },
  {
    id: "green-screen",
    name: "Cyc & Green Screens",
    count: "12+ Arenas",
    description: "Full cyclorama walls and RGB programmable DMX lighting for VFX.",
    icon: Clapperboard,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
    gradient: "from-emerald-600/80 to-teal-600/80",
  },
];

export default function CategoriesSection() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#090d16] border-t border-white/[0.06]">
      <div className="relative mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            Tailored Productions
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Browse by{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Creative Discipline
            </span>
          </h2>
          <p className="text-sm text-slate-400">
            Find the ideal physical environment customized to your shoot parameters.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/studios?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-80 rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-900/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(34,211,238,0.15)]"
              >
                {/* Background Image Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                
                {/* Gradients & Shading Overlays */}
                <div className="absolute inset-0 bg-slate-950/75 transition-opacity group-hover:opacity-65" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950" />

                {/* Top Corner Meta */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-105">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Bottom Card Copy */}
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-cyan-400">
                    {cat.count}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}