"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  title: string;
  highlight: string;
  description: string;
  category: string;
  location: string;
  image: string;
  link: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Cinematic Soundstages Built For",
    highlight: "Limitless Stories",
    description: "Book production stages equipped with motorized lighting grids, cycloramas, and acoustically isolated bays ready for feature filming.",
    category: "Film Production",
    location: "Tejgaon Industrial Area, Dhaka",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop",
    link: "/studios",
  },
  {
    id: 2,
    title: "Sun-Drenched Lofts Engineered For",
    highlight: "Editorial Visuals",
    description: "Capture high-fashion portraits with floor-to-ceiling industrial glass panels, strobe setups, and flexible styling zones.",
    category: "Photo Loft",
    location: "Gulshan 2, Dhaka",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    link: "/studios",
  },
  {
    id: 3,
    title: "Acoustically Treated Rooms For",
    highlight: "Pure Audio Capture",
    description: "Broadcast-grade podcast rooms and vocal suites with Shure SM7B mics, multi-cam capture rigs, and zero audio bleed.",
    category: "Podcast Suite",
    location: "Banani, Dhaka",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1600&auto=format&fit=crop",
    link: "/studios",
  },
];

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // à¦¸à¦¾à¦°à§à¦­à¦¾à¦° à¦ªà§à¦°à¦¿-à¦°à§‡à¦¨à§à¦¡à¦¾à¦°à§‡à¦° à¦¸à¦®à§Ÿ à¦¸à§à¦Ÿà§à¦¯à¦¾à¦Ÿà¦¿à¦• à¦«à¦²à¦¬à§à¦¯à¦¾à¦• à¦¦à§‡à¦–à¦¾à¦¬à§‡ à¦¯à¦¾à¦¤à§‡ à¦•à§‹à¦¨à§‹ Date/SSR à¦“à§Ÿà¦¾à¦°à§à¦¨à¦¿à¦‚ à¦¨à¦¾ à¦†à¦¸à§‡
  if (!mounted) {
    return (
      <section className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] bg-[#090d16] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${slides[0].image})` }}
        />
        <div className="absolute inset-0 bg-[#090d16]/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-10 lg:px-12">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                <Sparkles className="h-3.5 w-3.5" />
                {slides[0].category}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
              {slides[0].title}{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                {slides[0].highlight}
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {slides[0].description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-10 !h-1.5 !rounded-full !bg-white/30 [&.swiper-pagination-bullet-active]:!bg-cyan-400 [&.swiper-pagination-bullet-active]:!w-14 transition-all duration-300"></span>`;
          },
        }}
        loop={true}
        className="h-[580px] sm:h-[640px] lg:h-[700px] w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Background Image with Cinematic Darkness & Blur */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Dark & Gradient Overlays */}
            <div className="absolute inset-0 bg-[#090d16]/75 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/60 to-transparent" />

            {/* Slide Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-10 lg:px-12">
              <div className="max-w-2xl space-y-6">
                {/* Meta Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {slide.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {slide.location}
                  </span>
                </div>

                {/* Headings */}
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
                  {slide.title}{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    asChild
                    className="h-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 text-xs sm:text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:from-blue-500 hover:to-cyan-500 hover:scale-[1.02] transition-all"
                  >
                    <Link href={slide.link} className="flex items-center gap-2">
                      Explore Space <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-full border-white/15 bg-white/5 px-6 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all"
                  >
                    <Link href="/dashboard/add-studio">List Your Studio</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}