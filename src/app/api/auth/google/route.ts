import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import clientPromise from "@/lib/db";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json({ message: "Google credential token missing" }, { status: 400 });
    }

    // গুগল টোকেন সার্ভার সাইডে ভেরিফাই করা
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ message: "Invalid Google token payload" }, { status: 400 });
    }

    const { email, name, picture } = payload;

    const mongoClient = await clientPromise;
    const db = mongoClient.db("studiospace_db");

    // ইউজার ইতিমধ্যে আছে কি না চেক করা
    let user = await db.collection("users").findOne({ email: email.toLowerCase() });

    if (!user) {
      // নতুন ইউজার হলে তৈরি করা
      const newUser = {
        name: name || "Google Creator",
        email: email.toLowerCase(),
        image: picture || null,
        provider: "google",
        role: "creator",
        createdAt: new Date().toISOString(),
      };
      const result = await db.collection("users").insertOne(newUser);
      user = { _id: result.insertedId, ...newUser };
    } else if (!user.image && picture) {
      // আগের ইউজারের ছবি না থাকলে গুগলের ছবি সেট করে দেওয়া
      await db.collection("users").updateOne(
        { email: email.toLowerCase() },
        { $set: { image: picture } }
      );
      user.image = picture;
    }

    const safeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image || null,
    };

    const res = NextResponse.json({
      success: true,
      message: "Google sign-in successful",
      user: safeUser,
    });

    // সেশন কুকি সেট করা
    res.cookies.set("studiospace_session", JSON.stringify(safeUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error: any) {
    console.error("Google Auth Error:", error);
    return NextResponse.json(
      { message: error?.message || "Google authentication failed" },
      { status: 500 }
    );
  }
}