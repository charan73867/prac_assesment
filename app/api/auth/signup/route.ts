import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";

/**
 * POST /api/auth/signup
 * Handles user registration
 */
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // --- Validation ---
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // --- Connect to database ---
    const { db } = await connectToDatabase();

    // --- Check if user already exists ---
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // --- Hash password ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- Create new user ---
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // --- Success response ---
    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

    // --- Internal server error ---
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}