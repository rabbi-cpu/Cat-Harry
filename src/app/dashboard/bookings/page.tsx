"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Trash2,
  ArrowLeft,
  Sparkles,
  Loader2,
  CalendarCheck2,
} from "lucide-react";
import toast from "react-hot-toast";

interface Booking {
  _id: string;
  studioName: string;
  category: string;
  location: string;
  date: string;
  hours: number;
  totalPrice: number;
  status?: string;
}

export default function BookingsDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadBookings() {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        // নিশ্চিত করা হচ্ছে কেবল আসল ডাটাবেজ ডেটাই রেন্ডার হবে
        setBookings(Array.isArray(data) ? data : []);
      } else {
        setBookings([]);
      }
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/bookings?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Reservation canceled successfully");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error("Failed to cancel reservation");
      }
    } catch {
      toast.error("Network error while canceling");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <Link
            href="/studios"
            className="rounded-xl bg-cyan-500/10 border border-cyan-400/20 px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20 transition"
          >
            + Book Another Studio
          </Link>
        </div>

        <div className="mb-10 space-y-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            Verified Reservation Pipeline
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            My Booked Creative Spaces
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Review your production call-times, studio location addresses, and manage your schedules.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            <p className="text-xs text-slate-400">Loading your scheduled sessions...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center max-w-md mx-auto space-y-4">
            <CalendarCheck2 className="h-12 w-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Active Reservations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You haven&apos;t reserved any creative studios yet. Explore available photography or cinema spaces to get started.
            </p>
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
            >
              Browse Available Studios
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-5 flex flex-col justify-between hover:border-cyan-500/30 transition shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-400/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                        {booking.category || "Creative Set"}
                      </span>
                      <h3 className="text-base font-bold text-white line-clamp-1">
                        {booking.studioName}
                      </h3>
                      <p className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                        {booking.location}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-500/10 border border-emerald-400/20 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                      Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-slate-950/60 rounded-2xl p-3 border border-white/5 text-xs mb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>{booking.date || "Date Not Set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>{booking.hours} Hours Session</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Total Paid</span>
                    <p className="text-base font-extrabold text-cyan-400">
                      ৳{booking.totalPrice?.toLocaleString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={deletingId === booking._id}
                    onClick={() => handleDelete(booking._id)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3.5 py-2 text-xs font-semibold transition disabled:opacity-50"
                  >
                    {deletingId === booking._id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    Cancel Reservation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}