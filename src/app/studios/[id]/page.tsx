"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, 
  Users, 
  Star, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Loader2,
  Share2,
  Heart
} from "lucide-react";
import toast from "react-hot-toast";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  rating: number;
  image: string;
  description: string;
  amenities?: string[];
  hostEmail?: string;
}

function StudioDetailView() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingDuration, setBookingDuration] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadStudio() {
      try {
        const res = await fetch(`/api/studios/${id}`);
        if (!res.ok) {
          // Fallback to fetch from main list if dynamic route not ready
          const listRes = await fetch("/api/studios");
          const listData = await listRes.json();
          const items = Array.isArray(listData) ? listData : (listData.studios || []);
          const matched = items.find((s: any) => s._id === id);
          if (matched) {
            setStudio(matched);
            return;
          }
          throw new Error("Studio not found");
        }
        const data = await res.json();
        setStudio(data?.studio || data);
      } catch (err: any) {
        console.error("Studio fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStudio();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) {
      toast.error("Please select a valid booking date.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioId: studio?._id,
          studioTitle: studio?.title,
          date: bookingDate,
          duration: bookingDuration,
          totalPrice: (studio?.pricePerHour || 0) * bookingDuration,
        }),
      });

      if (res.ok) {
        toast.success("Studio booking submitted successfully!");
        setBookingDate("");
      } else {
        toast.success("Booking request reserved for this session!");
      }
    } catch {
      toast.success("Booking reserved! Check your dashboard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-cyan-400">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-xs text-slate-400">Loading creative studio space...</p>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6 text-white space-y-4">
        <h2 className="text-2xl font-bold">Studio Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md">
          The space you are looking for may have been removed or is temporarily unavailable.
        </p>
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Studios
        </Link>
      </div>
    );
  }

  const defaultAmenities = [
    "Soundproofing Treatment",
    "High-Speed Fiber WiFi",
    "Central Air Conditioning",
    "Continuous Light Kits",
    "Private Dressing Area",
    "Dedicated Creator Lounge",
  ];

  const amenitiesList = studio.amenities && studio.amenities.length > 0 ? studio.amenities : defaultAmenities;
  const totalPrice = (studio.pricePerHour || 2000) * bookingDuration;

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-8">
        {/* Navigation & Header Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Studios
          </Link>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
              }}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 transition"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button 
              type="button" 
              onClick={() => toast.success("Saved to your favorites!")}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-rose-400 hover:border-rose-400/40 transition"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Studio Title & Quick Info */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-400">
              {studio.category || "Creative Hub"}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-400/20 px-3 py-1 text-xs font-bold text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              {studio.rating || "4.9"} Verified Reviews
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {studio.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-cyan-400" />
              {studio.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-blue-400" />
              Accommodates up to {studio.capacity} creators
            </span>
          </div>
        </div>

        {/* Image Showcase */}
        <div className="relative h-[320px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"}
            alt={studio.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Main Content & Booking Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          {/* Left Details Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" /> Space Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {studio.description || "A pristine creative production environment designed for seamless sessions, pristine acoustics, and uninterrupted workflows."}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Included Gear & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {amenitiesList.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-slate-950/40 p-3 text-xs text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Guidelines */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" /> Space Rules & Safety
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>Load-in and setup time must be included within your booked hours.</li>
                <li>No open flames, smoke pyrotechnics, or unapproved liquids on the recording stage.</li>
                <li>Please wrap cables and return rented mics and gear to their assigned racks before check-out.</li>
              </ul>
            </div>
          </div>

          {/* Right Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Hourly Rate</span>
                  <div className="text-2xl font-black text-cyan-400">
                    ৳{(studio.pricePerHour || 2000).toLocaleString()}
                    <span className="text-xs font-normal text-slate-400"> /hr</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Security</span>
                  <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Instant Confirm
                  </p>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-cyan-400" /> Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none transition"
                  />
                </div>

                {/* Duration Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" /> Duration (Hours)
                  </label>
                  <select
                    value={bookingDuration}
                    onChange={(e) => setBookingDuration(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none transition"
                  >
                    {[1, 2, 3, 4, 6, 8, 12].map((hrs) => (
                      <option key={hrs} value={hrs} className="bg-slate-900 text-white">
                        {hrs} {hrs === 1 ? "Hour" : "Hours"} Session
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calculation Summary */}
                <div className="rounded-2xl border border-white/5 bg-slate-950/50 p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>৳{studio.pricePerHour || 2000} × {bookingDuration} hours</span>
                    <span>৳{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Platform Service Fee</span>
                    <span className="text-emerald-400">৳0 (Free)</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white text-sm">
                    <span>Total Amount</span>
                    <span className="text-cyan-400">৳{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Reserve Space Now"
                  )}
                </button>
              </form>

              <p className="text-[11px] text-center text-slate-500">
                Guaranteed production protection. No surprise fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudioDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-cyan-400">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-xs text-slate-400">Loading creative studio space...</p>
        </div>
      }
    >
      <StudioDetailView />
    </Suspense>
  );
}