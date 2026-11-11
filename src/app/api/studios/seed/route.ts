import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

const initialStudios = [
  {
    title: "AcousticPro Studio & Podcast Lab",
    category: "Music & Podcast",
    location: "Banani, Dhaka",
    capacity: 6,
    pricePerHour: 2200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    description: "Sound-treated live recording room equipped with Shure SM7B mics, audio interface, and ambient podcast lighting setup.",
    amenities: ["Soundproofing", "Air Conditioning", "High-Speed WiFi", "Audio Monitor", "Coffee Station"],
    hostEmail: "host@studiospace.com",
    createdAt: new Date().toISOString()
  },
  {
    title: "Infinity White Stage & Film Studio",
    category: "Film & Cinema",
    location: "Uttara, Dhaka",
    capacity: 25,
    pricePerHour: 3500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    description: "Spacious seamless cyclorama infinity wall ideal for high-fashion photoshoots, music videos, and commercial shoots.",
    amenities: ["Infinity Cyc Wall", "3-Phase Power Backup", "Green Screen", "Dressing Vanity", "Parking"],
    hostEmail: "host@studiospace.com",
    createdAt: new Date().toISOString()
  },
  {
    title: "Daylight Atelier Photo Loft",
    category: "Photography",
    location: "Dhanmondi, Dhaka",
    capacity: 10,
    pricePerHour: 1800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80",
    description: "Sunlit minimalist loft featuring floor-to-ceiling north-facing windows, rustic brick textures, and multiple backdrops.",
    amenities: ["Natural Sunlight", "Godox Softboxes", "Wardrobe Racks", "Makeup Mirror", "Props Shelf"],
    hostEmail: "host@studiospace.com",
    createdAt: new Date().toISOString()
  },
  {
    title: "Neon Cyberpunk Production Bay",
    category: "Film & Cinema",
    location: "Gulshan 1, Dhaka",
    capacity: 15,
    pricePerHour: 2800,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    description: "Futuristic neon tubes, dark sci-fi aesthetic, haze machine support, and RGB tube lighting for music videos and reels.",
    amenities: ["RGB Tube Lights", "Fog Machine", "Aputure 300D", "Playback Speakers", "Lounge Area"],
    hostEmail: "host@studiospace.com",
    createdAt: new Date().toISOString()
  },
  {
    title: "Urban Rhythm Dance & Rehearsal Floor",
    category: "Dance & Rehearsal",
    location: "Mirpur DOHS, Dhaka",
    capacity: 20,
    pricePerHour: 1500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    description: "Spring wooden dance floor, full-wall mirrors, surround acoustic Bluetooth soundbar, and dynamic strobe lights.",
    amenities: ["Full Wall Mirrors", "Sprung Hardwood Floor", "Surround Sound", "Changing Rooms", "Water Cooler"],
    hostEmail: "host@studiospace.com",
    createdAt: new Date().toISOString()
  },
  {
    title: "Vocal Haven Voiceover & Audio Suite",
    category: "Music & Podcast",
    location: "Mohakhali DOHS, Dhaka",
    capacity: 4,
    pricePerHour: 1600,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-quiet whisper booth designed for pristine voiceover narration, dubbing, audiobooks, and radio podcasting.",
    amenities: ["Whisper Room Booth", "Neumann Mic", "Logic Pro Rig", "Acoustic Baffles", "Fast WiFi"],
    hostEmail: "host@studiospace.com",
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("studiospace_db");

    for (const studio of initialStudios) {
      await db.collection("studios").updateOne(
        { title: studio.title },
        { $set: studio },
        { upsert: true }
      );
    }

    const total = await db.collection("studios").countDocuments();

    return NextResponse.json({
      success: true,
      message: `Database synchronized! Total studios: ${total}`,
      total
    });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "Failed to seed studios" }, { status: 500 });
  }
}