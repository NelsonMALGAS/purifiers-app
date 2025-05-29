import connectToDb from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const db = await connectToDb();
    const purifiersCollection = db.collection("purifiers");

    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { error: "User ID (uid) is required" },
        { status: 400 }
      );
    }

    const purifiers = await purifiersCollection.find({ userId: uid }).toArray();

    if (!purifiers.length) {
      return NextResponse.json(
        { error: "No purifiers found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(purifiers, { status: 200 });
  } catch (error) {
    console.error("Error fetching purifiers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
