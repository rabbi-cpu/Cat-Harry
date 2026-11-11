import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Backend Password Criteria Check
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      return NextResponse.json(
        { message: "Password must have at least 1 uppercase, 1 lowercase letter, and be at least 6 characters long." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("studiospace_db");

    const existingUser = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "creator",
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("users").insertOne(newUser);

    const userPayload = {
      id: result.insertedId.toString(),
      name,
      email: email.toLowerCase(),
    };

    const response = NextResponse.json(
      { message: "Account created successfully", user: userPayload },
      { status: 201 }
    );

    response.cookies.set("studiospace_session", JSON.stringify(userPayload), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "Registration failed" }, { status: 500 });
  }
}