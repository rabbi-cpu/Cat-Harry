import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

const sampleStudios = [
  {
    name: "NeonAura Visual & Cyberpunk Stage",
    category: "Photography",
    location: "Dhanmondi, Dhaka",
    pricePerHour: 2800,
    capacity: 12,
    rating: 4.9,
    description: "State-of-the-art cinematic cyberpunk lighting rig, fully controllable RGB background panels, seamless infinity curve cyclorama, and high-speed smoke generators tailored for commercial shoots and music videos.",
    amenities: ["Godox LED Lights", "Smoke Machine", "Infinity Cyc Wall", "Dressing Room", "High-Speed WiFi"],
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
    ],
    createdAt: new Date().toISOString()
  },
  {
    name: "AcousticPro Studio & Podcast Lab",
    category: "Music & Podcast",
    location: "Banani, Dhaka",
    pricePerHour: 2200,
    capacity: 6,
    rating: 4.8,
    description: "Acoustically treated floating studio suite with broadcast-grade Shure SM7B mics, multi-cam 4K switcher, and soundproof observation window. Ideal for master tracks and video podcasts.",
    amenities: ["Shure SM7B Mics", "Rodecaster Pro II", "Acoustic Insulation", "Sony FX3 Cams", "Lounge Area"],
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop"
    ],
    createdAt: new Date().toISOString()
  },
  {
    name: "Infinity White Stage & Film Studio",
    category: "Film & Cinema",
    location: "Uttara, Dhaka",
    pricePerHour: 3500,
    capacity: 25,
    rating: 5.0,
    description: "Spacious warehouse-style white cyclorama studio complete with overhead motorized truss system, green screen backdrop options, high-amperage 3-phase power, and dedicated makeup vanity.",
    amenities: ["Green Screen Wall", "Overhead Grid Truss", "3-Phase Power", "Private Makeup Vanity", "VIP Green Room"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop"
    ],
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("studiospace_db");

    // আগের কোনো খালি ডেটা থাকলে ক্লিয়ার করে নতুনগুলো ইনসার্ট করবে
    await db.collection("studios").deleteMany({});
    const result = await db.collection("studios").insertMany(sampleStudios);

    return NextResponse.json({
      success: true,
      message: "Studios successfully inserted into MongoDB!",
      insertedCount: result.insertedCount
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}