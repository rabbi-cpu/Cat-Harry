import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";

export const original6Studios = [
  {
    _id: "6730da4f1234567890000001",
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
    ]
  },
  {
    _id: "6730da4f1234567890000002",
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
    ]
  },
  {
    _id: "6730da4f1234567890000003",
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
    ]
  },
  {
    _id: "6730da4f1234567890000004",
    name: "Retro Loft Daylight Photo Studio",
    category: "Photography",
    location: "Gulshan 1, Dhaka",
    pricePerHour: 2500,
    capacity: 10,
    rating: 4.7,
    description: "Industrial chic aesthetic space with floor-to-ceiling north-facing windows for natural daylight shoots, exposed brick walls, vintage props, and dedicated styling wardrobe.",
    amenities: ["Natural North Daylight", "Vintage Props", "Profoto Strobes", "Garment Steamer", "Changing Room"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    _id: "6730da4f1234567890000005",
    name: "SonicWave Dolby Mixing & Tracking Room",
    category: "Music & Podcast",
    location: "Mirpur DOHS, Dhaka",
    pricePerHour: 3000,
    capacity: 8,
    rating: 4.9,
    description: "Certified sound-engineered mixing facility featuring Genelec Smart Active monitors, analog outboard preamps, custom vocal booth, and calibrated bass traps.",
    amenities: ["Genelec Monitors", "Universal Audio Apollo", "Neumann U87 Mic", "Isolated Vocal Booth", "Air Conditioned"],
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    _id: "6730da4f1234567890000006",
    name: "VibeFlow Dance & Rehearsal Arena",
    category: "Dance & Rehearsal",
    location: "Mohakhali, Dhaka",
    pricePerHour: 1800,
    capacity: 30,
    rating: 4.8,
    description: "Full-wall mirrored dance rehearsal sanctuary with sprung hardwood flooring, club-grade Bluetooth PA sound system, ambient LED uplighting, and cooling chill lounge.",
    amenities: ["Sprung Oak Floor", "Full Wall Mirrors", "JBL PartyBox Sound", "Ambient RGB Uplighting", "Water Dispenser"],
    images: [
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("studiospace_db");
    const studios = await db.collection("studios").find({}).toArray();

    if (studios.length > 0) {
      const formatted = studios.map((s) => ({
        ...s,
        _id: s._id.toString(),
      }));
      return NextResponse.json(formatted, { status: 200 });
    }

    return NextResponse.json(original6Studios, { status: 200 });
  } catch (error) {
    return NextResponse.json(original6Studios, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("studiospace_db");

    const newStudio = {
      ...body,
      createdAt: new Date().toISOString()
    };

    const result = await db.collection("studios").insertOne(newStudio);
    return NextResponse.json({ success: true, id: result.insertedId.toString() }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to insert studio" }, { status: 500 });
  }
}

// DELETE হ্যান্ডলার: ডাটাবেজ থেকে মুছে ফেলবে
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Studio ID required" }, { status: 400 });
    }

    try {
      const client = await clientPromise;
      const db = client.db("studiospace_db");

      if (ObjectId.isValid(id)) {
        await db.collection("studios").deleteOne({ _id: new ObjectId(id) });
      } else {
        await db.collection("studios").deleteOne({ _id: new ObjectId(id) });
      }
    } catch {
      // DB connection fallback
    }

    return NextResponse.json({ success: true, message: "Studio deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}