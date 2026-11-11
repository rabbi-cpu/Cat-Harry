import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("studiospace_db");

    // সর্বোচ্চ ৬টি স্টুডিও লেটেস্ট ক্রিয়েশন অনুযায়ী ফেচ করা
    const studios = await db
      .collection("studios")
      .find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    // মঙ্গোডিবির _id অবজেক্টকে স্ট্রিংয়ে কনভার্ট করা
    const formattedStudios = studios.map((studio) => ({
      ...studio,
      _id: studio._id.toString(),
    }));

    return NextResponse.json(formattedStudios, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch featured studios:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured studios" },
      { status: 500 }
    );
  }
}