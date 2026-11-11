"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Trash2,
  ExternalLink,
  PlusCircle,
  CalendarCheck2,
  ArrowLeft,
  Sparkles,
  MapPin,
  Users,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

interface Studio {
  _id: string;
  name: string;
  category: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  images?: string[];
}

export default function MyStudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchStudios() {
    try {
      setLoading(true);
      const res = await fetch("/api/studios", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStudios(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error("Failed to load studio spaces");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudios();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from your listings?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/studios?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Studio listing removed successfully");
        // সাথে সাথে স্টেট থেকে সরিয়ে নেওয়া
        setStudios((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error("Failed to delete studio");
      }
    } catch {
      // অফলাইন/ফলব্যাক হলেও UI থেকে বাদ দেওয়া
      setStudios((prev) => prev.filter((s) => s._id !== id));
      toast.success("Listing removed from view");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to explore spaces
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
            >
              <CalendarCheck2 className="h-4 w-4 text-cyan-400" />
              My Bookings
            </Link>
            <Link
              href="/dashboard/add-studio"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-3.5 py-2 text-xs font-bold text-slate-950 transition shadow-lg shadow-cyan-500/20"
            >
              <PlusCircle className="h-4 w-4" />
              List New Studio
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10 space-y-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            Host Management
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Manage My <span className="text-cyan-400">Studio Listings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Control your published sets, monitor capacity, or remove listings from the marketplace.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            <p className="text-xs text-slate-400">Loading your listed sets...</p>
          </div>
        ) : studios.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center max-w-md mx-auto space-y-4">
            <Building2 className="h-12 w-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Studios Listed Yet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You haven&apos;t published any creative studios. Start earning by listing your photography, podcast, or film set.
            </p>
            <Link
              href="/dashboard/add-studio"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
            >
              <PlusCircle className="h-4 w-4" />
              Publish First Studio
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md hover:border-cyan-500/30 transition shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-24 sm:h-24 sm:w-32 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-white/5">
                    <img
                      src={studio.images?.[0] || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop"}
                      alt={studio.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-cyan-500/10 border border-cyan-400/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                        {studio.category}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        Active
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
                      {studio.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                        {studio.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-cyan-400" />
                        Capacity: {studio.capacity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-5 border-t border-white/5 md:border-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Hourly Rate</span>
                    <p className="text-lg font-black text-white">
                      ৳{studio.pricePerHour?.toLocaleString()}{" "}
                      <span className="text-xs font-normal text-slate-400">/hr</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/studios/${studio._id}`}
                      className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                      title="View Live Listing"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      disabled={deletingId === studio._id}
                      onClick={() => handleDelete(studio._id, studio.name)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3.5 py-2.5 text-xs font-semibold transition disabled:opacity-50"
                    >
                      {deletingId === studio._id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Delete
                    </button>
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