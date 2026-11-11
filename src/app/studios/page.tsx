"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Users, 
  Star, 
  ArrowRight, 
  Loader2, 
  SlidersHorizontal,
  Sparkles
} from "lucide-react";

interface Studio {
  _id: string;
  title?: string;
  category?: string;
  location?: string;
  capacity?: number;
  pricePerHour?: number;
  rating?: number;
  image?: string;
  description?: string;
}

export default function StudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Photography",
    "Music & Podcast",
    "Film & Cinema",
    "Dance & Rehearsal",
  ];

  useEffect(() => {
    async function fetchStudios() {
      try {
        const res = await fetch("/api/studios", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data)) {
          setStudios(data);
        } else if (data?.studios && Array.isArray(data.studios)) {
          setStudios(data.studios);
        }
      } catch (err) {
        console.error("Failed to load studios:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudios();
  }, []);

  // Safe Filtering Logic (Cannot read properties of undefined ফিক্স)
  const filteredStudios = studios.filter((studio) => {
    const title = (studio?.title || "").toLowerCase();
    const location = (studio?.location || "").toLowerCase();
    const category = (studio?.category || "").toLowerCase();
    const search = (searchTerm || "").toLowerCase().trim();

    const matchesSearch = 
      title.includes(search) || 
      location.includes(search) || 
      category.includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      category.includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" /> Curated Production Hubs
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Explore Creative <span className="text-cyan-400">Studios</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Find sound-treated recording stages, cinema production sets, and photography bays tailored for creators in Dhaka.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by studio name or area (e.g. Dhanmondi, Banani, Uttara)..."
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 pl-12 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 backdrop-blur-xl focus:border-cyan-400 focus:outline-none transition shadow-2xl"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold"
                      : "bg-slate-900/60 text-slate-400 hover:text-white border border-white/5 hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            <p className="text-xs text-slate-400">Loading creative spaces...</p>
          </div>
        ) : filteredStudios.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-white/10 bg-slate-900/30 p-8">
            <p className="text-sm font-semibold text-slate-300">No studios found matching your search.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching a different location or select &apos;All&apos;.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Studio Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"}
                      alt={studio.title || "Creative Studio"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-cyan-300">
                      {studio.category || "Studio"}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span>{studio.rating || "5.0"}</span>
                    </div>
                  </div>

                  {/* Studio Details */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
                      {studio.title || "Untitled Studio"}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                        {studio.location || "Dhaka"}
                      </span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Users className="h-3.5 w-3.5 text-blue-400" />
                        {studio.capacity || 10} creators
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 pt-1 leading-relaxed">
                      {studio.description || "Fully soundproofed production floor with verified gear."}
                    </p>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="p-5 pt-0 mt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Starts At</span>
                    <p className="text-base font-black text-cyan-400">
                      ৳{studio.pricePerHour?.toLocaleString() || "2,000"}
                      <span className="text-xs font-normal text-slate-400"> /hr</span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 px-4 py-2 text-xs font-bold text-white transition shadow-md"
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}