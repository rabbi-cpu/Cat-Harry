"use client";

import {
  Suspense,
  useEffect,
  useState,
  useTransition,
  useCallback,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Loader2,
  Sparkles,
  RefreshCcw,
} from "lucide-react";

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
    description:
      "Industrial north-facing floor-to-ceiling glass studio with Godox strobes.",
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
    description:
      "Soundproof white cyc with motorized grid and 3-phase power drive-in.",
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
    description:
      "Treated 4-mic podcast suite with Blackmagic 4K switcher and Rodecaster.",
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
    description:
      "Mood aesthetic styling studio featuring vintage props and velvet drapery.",
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
    description:
      "Full green screen wraparound soundstage with overhead RGB DMX panels.",
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
    description:
      "Analog master studio with acoustic diffusion and live recording lounge.",
  },
];

const categories = [
  "All",
  "Photo Studio",
  "Film Production",
  "Podcast Suite",
  "Recording Studio",
];

function StudiosListContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [studios, setStudios] = useState<Studio[]>(fallbackStudios);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [, startTransition] = useTransition();

  const fetchStudios = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      if (selectedCategory && selectedCategory !== "All")
        params.append("category", selectedCategory);
      if (sortBy) params.append("sort", sortBy);

      const res = await fetch(`/api/studios?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setStudios(data);
        } else if (!searchTerm && selectedCategory === "All") {
          setStudios(fallbackStudios);
        } else {
          const filtered = fallbackStudios.filter((s) => {
            const matchesSearch = s.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
            const matchesCategory =
              selectedCategory === "All" ||
              s.category.toLowerCase() === selectedCategory.toLowerCase();
            return matchesSearch && matchesCategory;
          });
          setStudios(filtered);
        }
      } else {
        setStudios(fallbackStudios);
      }
    } catch {
      setStudios(fallbackStudios);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        fetchStudios();
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchStudios]);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            Live Marketplace
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Explore All{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Creative Sets
            </span>
          </h1>
          <p className="text-sm text-slate-400">
            Filter through daylight lofts, film stages, sound booths, and broadcast facilities across the city.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-4 sm:p-6 backdrop-blur-xl mb-12 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by studio name..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
                <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
                Sort:
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-48 rounded-2xl border border-white/10 bg-slate-900 py-3 px-4 text-xs font-medium text-white focus:border-cyan-500/50 focus:outline-none"
              >
                <option value="newest">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Studios Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-80 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            <p className="text-xs text-slate-400">Loading production spaces...</p>
          </div>
        ) : studios.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/30 p-12 text-center max-w-lg mx-auto space-y-4">
            <p className="text-base font-bold text-white">No Studios Found</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-cyan-400 hover:text-white hover:bg-white/5 transition"
            >
              <RefreshCcw className="h-3.5 w-3.5 mr-2" /> Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      studio.images?.[0] ||
                      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"
                    }
                    alt={studio.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      {studio.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-xs font-bold text-amber-300">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{studio.rating || "4.9"}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {studio.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{studio.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Rate</p>
                      <p className="text-base font-extrabold text-white">
                        ৳{studio.pricePerHour}{" "}
                        <span className="text-xs font-normal text-slate-400">/ hr</span>
                      </p>
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 px-4 h-9 text-xs font-semibold text-white shadow-md hover:from-blue-500 hover:to-cyan-500 transition-all"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        </div>
      }
    >
      <StudiosListContent />
    </Suspense>
  );
}