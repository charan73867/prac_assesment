import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

type Params = { params: { id: string } };

// DELETE /api/tasks/:id
export async function DELETE(req: Request, { params }: Params) {
  try {
    const id = params.id;
    const client = await clientPromise;
    const db = client.db("pracsphere");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    const result = await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("DELETE task error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/tasks/:id
export async function PATCH(req: Request, { params }: Params) {
  try {
    const id = params.id;
    const client = await clientPromise;
    const db = client.db("pracsphere");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    const { status }: { status: "pending" | "completed" } = await req.json();

    const updateResult = await db.collection("tasks").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status } },
      { returnDocument: "after", includeResultMetadata: true } // <-- important
    );

    if (!updateResult.value) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updateResult.value);
  } catch (err) {
    console.error("PATCH task error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}