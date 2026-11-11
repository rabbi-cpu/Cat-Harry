"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  DollarSign,
  ShieldCheck,
  Zap,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Layers,
  Users,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AddStudioAndHostPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Photography",
    location: "Dhanmondi, Dhaka",
    pricePerHour: "",
    capacity: "",
    images: "",
    amenities: "",
    description: "",
  });

  // Dynamic Earning Calculator State
  const estimatedHoursPerWeek = 20;
  const currentHourlyRate = Number(formData.pricePerHour) || 2500;
  const estimatedMonthlyEarning = currentHourlyRate * estimatedHoursPerWeek * 4;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.pricePerHour || !formData.capacity) {
      toast.error("Please fill in all required studio details");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        location: formData.location,
        pricePerHour: Number(formData.pricePerHour),
        capacity: Number(formData.capacity),
        rating: 5.0,
        images: formData.images
          ? [formData.images]
          : [
              "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
            ],
        amenities: formData.amenities
          ? formData.amenities.split(",").map((item) => item.trim())
          : ["High-Speed WiFi", "Acoustic Walls", "Dressing Area"],
        description:
          formData.description ||
          "Professional high-spec creative space optimized for commercial production and content creation.",
      };

      const res = await fetch("/api/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Studio published to marketplace!");
        router.push("/dashboard/my-studios");
      } else {
        toast.error("Failed to list studio");
      }
    } catch {
      toast.error("Network error while publishing studio");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/my-studios"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to My Studios
          </Link>
          <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 rounded-full">
            Host Partner Program
          </span>
        </div>

        {/* Hero: Become a Space Host Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-cyan-950/40 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" />
              Monetize Your Creative Real Estate
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Become a Space Host &{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                List Your Studio
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Turn your shooting bay, podcast room, or acoustic set into consistent revenue. Connect directly with vetted directors, musicians, and digital creators across Dhaka.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <DollarSign className="h-4 w-4" /> Earning Potential
              </div>
              <p className="text-2xl font-black text-white">
                ৳{estimatedMonthlyEarning.toLocaleString()}{" "}
                <span className="text-[11px] font-normal text-slate-400">/mo</span>
              </p>
              <p className="text-[11px] text-slate-400">Based on ~20 booked hours/week</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                <ShieldCheck className="h-4 w-4" /> Host Protection
              </div>
              <p className="text-2xl font-black text-white">100%</p>
              <p className="text-[11px] text-slate-400">Verified crew scheduling and deposits</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
                <Zap className="h-4 w-4" /> Instant Onboarding
              </div>
              <p className="text-2xl font-black text-white">&lt; 2 Minutes</p>
              <p className="text-[11px] text-slate-400">Live instantly on the marketplace</p>
            </div>
          </div>
        </section>

        {/* Main Content Layout: Form + Host Perks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Listing Form */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-cyan-400" />
              Studio Specifications
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Provide authentic gear and workspace parameters to get fast bookings.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Studio Space Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Lumina Soundstage & Visual Bay"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Music & Podcast">Music & Podcast</option>
                    <option value="Film & Cinema">Film & Cinema</option>
                    <option value="Dance & Rehearsal">Dance & Rehearsal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Location (Dhaka Hub) *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Dhanmondi, Dhaka">Dhanmondi, Dhaka</option>
                    <option value="Banani, Dhaka">Banani, Dhaka</option>
                    <option value="Gulshan 1, Dhaka">Gulshan 1, Dhaka</option>
                    <option value="Gulshan 2, Dhaka">Gulshan 2, Dhaka</option>
                    <option value="Uttara, Dhaka">Uttara, Dhaka</option>
                    <option value="Mirpur DOHS, Dhaka">Mirpur DOHS, Dhaka</option>
                    <option value="Mohakhali, Dhaka">Mohakhali, Dhaka</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hourly Rate (BDT) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-slate-400 text-xs">৳</span>
                    <input
                      type="number"
                      name="pricePerHour"
                      value={formData.pricePerHour}
                      onChange={handleChange}
                      placeholder="2800"
                      required
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 pl-8 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Max Capacity (People) *
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="12"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Leave empty to use high-res default studio showcase imagery.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Amenities & Gear (Comma separated)
                </label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="Godox LED Lights, Smoke Machine, Dressing Room, High-Speed WiFi"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Detailed Workspace Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your lighting truss, sound isolation, props, and shooting space highlights..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 py-3.5 text-xs font-bold text-slate-950 transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing Studio...
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4" />
                    Publish Studio to Marketplace
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Col: Host Benefits & Live Calculator */}
          <div className="space-y-6">
            {/* Live Estimator Card */}
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-950/20 p-6 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Live Revenue Estimator
              </h3>
              <p className="text-xs text-slate-400">
                At <strong>৳{currentHourlyRate.toLocaleString()} /hr</strong> with average creator weekend blocks:
              </p>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Weekend 10h block</span>
                  <span className="text-white font-bold">৳{(currentHourlyRate * 10).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Estimated Weekly (20h)</span>
                  <span className="text-white font-bold">৳{(currentHourlyRate * 20).toLocaleString()}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between text-xs">
                  <span className="text-cyan-400 font-semibold">Monthly Estimated</span>
                  <span className="text-cyan-400 font-black text-sm">৳{estimatedMonthlyEarning.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Why Host on StudioSpace */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-bold text-white">Why Host with Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Upfront Listing Fees:</strong> You keep your rate with seamless direct creator bookings.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Full Schedule Control:</strong> Confirm slots and accept productions on your own timeline.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>High-Intent Creators:</strong> Connect with photography teams, podcast hosts, and video crews.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}