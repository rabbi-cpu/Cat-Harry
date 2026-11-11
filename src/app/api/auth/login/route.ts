import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("studiospace_db");

    const user = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const userPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    const response = NextResponse.json({
      message: "Login successful",
      user: userPayload,
    });

    response.cookies.set("studiospace_session", JSON.stringify(userPayload), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "Login failed" }, { status: 500 });
  }
}