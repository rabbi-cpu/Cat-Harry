import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, image } = body;

    if (!email) {
      return NextResponse.json({ message: "User email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("studiospace_db");

    const updateDoc: any = {};
    if (typeof name === "string" && name.trim()) {
      updateDoc.name = name.trim();
    }
    if (image !== undefined) {
      updateDoc.image = image; // Base64 স্ট্রিং অথবা খালি স্ট্রিং ""
    }

    // MongoDB-তে আপডেট করা
    const result = await db.collection("users").findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: updateDoc },
      { returnDocument: "after" }
    );

    const updatedUser = result?.value || (await db.collection("users").findOne({ email: email.toLowerCase() }));

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const safeUser = {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image || null,
    };

    const res = NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: safeUser,
    });

    // সেশন কুকি রিফ্রেশ
    res.cookies.set("studiospace_session", JSON.stringify(safeUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: error?.message || "Failed to update profile" }, { status: 500 });
  }
}