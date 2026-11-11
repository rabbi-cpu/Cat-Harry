"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Star, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Studio {
  _id: string;
  name: string;
  category: string;
  location: string;
  pricePerHour: number;
  capacity?: number;
  rating?: number;
  images: string[];
  description: string;
}

// ডাটাবেজে ডাটা না থাকলে প্রিভিউ দেখানোর ডেমো স্টুডিও
const fallbackStudios: Studio[] = [
  {
    _id: "demo-1",
    name: "Apex Daylight Loft Studio",
    category: "Photo Studio",
    location: "Gulshan 2, Dhaka",
    pricePerHour: 3500,
    capacity: 15,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Industrial north-facing floor-to-ceiling glass studio with Godox strobes.",
  },
  {
    _id: "demo-2",
    name: "CineFlow Cyclorama Stage A",
    category: "Film Production",
    location: "Tejgaon Industrial Area, Dhaka",
    pricePerHour: 7500,
    capacity: 40,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Soundproof white cyc with motorized grid and 3-phase power drive-in.",
  },
  {
    _id: "demo-3",
    name: "The Sonic Booth Broadcast Suite",
    category: "Podcast Suite",
    location: "Banani, Dhaka",
    pricePerHour: 2200,
    capacity: 6,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Treated 4-mic podcast suite with Blackmagic 4K switcher and Rodecaster.",
  },
  {
    _id: "demo-4",
    name: "Noir Velvet Creative Loft",
    category: "Photo Studio",
    location: "Dhanmondi, Dhaka",
    pricePerHour: 2800,
    capacity: 10,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Mood aesthetic styling studio featuring vintage props and velvet drapery.",
  },
  {
    _id: "demo-5",
    name: "Prism Chroma Green Soundstage",
    category: "Film Production",
    location: "Uttara, Dhaka",
    pricePerHour: 6000,
    capacity: 25,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Full green screen wraparound soundstage with overhead RGB DMX panels.",
  },
  {
    _id: "demo-6",
    name: "Echo Chamber Audio Loft",
    category: "Recording Studio",
    location: "Mirpur DOHS, Dhaka",
    pricePerHour: 3000,
    capacity: 8,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Analog master studio with acoustic diffusion and live recording lounge.",
  },
];

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudios() {
      try {
        const res = await fetch("/api/studios/featured");
        if (res.ok) {
          const data = await res.json();
          setStudios(data.length > 0 ? data : fallbackStudios);
        } else {
          setStudios(fallbackStudios);
        }
      } catch (err) {
        console.error("Error fetching featured studios:", err);
        setStudios(fallbackStudios);
      } finally {
        setLoading(false);
      }
    }

    loadStudios();
  }, []);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#090d16]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" />
              Handpicked Production Sets
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Creative Spaces
              </span>
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Verified lofts and broadcast studios with transparent hourly rates and instant booking.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="group self-start md:self-end text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-full px-4 h-9"
          >
            <Link href="/studios" className="flex items-center gap-2">
              Browse All Spaces
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          </div>
        ) : (
          /* Studio Grid (Limit 6) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {studios.slice(0, 6).map((studio) => (
              <div
                key={studio._id}
                className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-900/40 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(34,211,238,0.12)] hover:-translate-y-1"
              >
                {/* Image Cover */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                  <img
                    src={
                      studio.images?.[0] ||
                      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"
                    }
                    alt={studio.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-semibold text-cyan-300 shadow-sm">
                      {studio.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-bold text-amber-300">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{studio.rating || "4.9"}</span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {studio.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{studio.location}</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                      {studio.description}
                    </p>
                  </div>

                  {/* Pricing and Details CTA */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider">Rate</p>
                      <p className="text-base font-extrabold text-white">
                        ৳{studio.pricePerHour}{" "}
                        <span className="text-[11px] font-normal text-slate-400">/ hr</span>
                      </p>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 text-xs font-semibold px-4 h-9 shadow-md transition-transform group-hover:scale-105"
                    >
                      <Link href={`/studios/${studio._id}`}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}