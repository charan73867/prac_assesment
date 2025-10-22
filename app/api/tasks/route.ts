import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const tasks = await db
      .collection("tasks")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Fetch tasks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, dueDate } = await request.json();
    if (!title || !description || !dueDate) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const newTask = {
      title,
      description,
      dueDate: new Date(dueDate),
      status: "pending",
      userId: session.user.id,
      createdAt: new Date(),
    };

    const result = await db.collection("tasks").insertOne(newTask);

    return NextResponse.json({ _id: result.insertedId.toString(), ...newTask });
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
