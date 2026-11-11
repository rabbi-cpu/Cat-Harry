import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";

// GET: সব বুকিং নিয়ে আসা
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("studiospace_db");
    const bookings = await db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = bookings.map((b) => ({
      ...b,
      _id: b._id.toString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST: নতুন বুকিং তৈরি
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("studiospace_db");

    const newBooking = {
      ...body,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
    };

    const result = await db.collection("bookings").insertOne(newBooking);
    return NextResponse.json(
      { message: "Booking confirmed", id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

// DELETE: বুকিং ডিলিট/ক্যান্সেল করা (আইডি কুয়েরি প্যারাম বা বডি থেকে নেবে)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("studiospace_db");

    let query: any = {};
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      query = { id: id };
    }

    const result = await db.collection("bookings").deleteOne(query);

    return NextResponse.json({
      success: true,
      message: "Reservation canceled successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete booking failed:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}