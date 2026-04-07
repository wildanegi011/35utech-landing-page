import { NextResponse } from "next/server";
import { db } from "@/db";
import { projectStatuses } from "@/db/schema";

export async function GET() {
  try {
    const statuses = await db.select().from(projectStatuses);
    return NextResponse.json(statuses);
  } catch (error) {
    console.error("Failed to fetch project statuses:", error);
    return NextResponse.json(
      { error: "Failed to fetch project statuses" },
      { status: 500 }
    );
  }
}
