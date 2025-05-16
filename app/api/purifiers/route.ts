import connectToDb from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    // Connect to MongoDB
    const db = await connectToDb();
    const purifiersCollection = db.collection("purifiers");

    // Extract user uid from query params (adjust this according to your auth)
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { error: "User ID (uid) is required" },
        { status: 400 }
      );
    }

    // Find a single purifier for the logged-in user
    const purifier = await purifiersCollection.findOne({ userId: uid });

    if (!purifier) {
      return NextResponse.json(
        { error: "No purifier found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(purifier, { status: 200 });
  } catch (error) {
    console.error("Error fetching purifier:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
