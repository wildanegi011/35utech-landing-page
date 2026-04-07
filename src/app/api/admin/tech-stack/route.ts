import { NextResponse } from "next/server";
import { db } from "@/db";
import { availableTechStacks } from "@/db/schema";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stacks = await db.query.availableTechStacks.findMany({
      orderBy: [asc(availableTechStacks.name)],
    });

    return NextResponse.json(stacks);
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    return NextResponse.json({ error: "Failed to fetch tech stacks" }, { status: 500 });
  }
}
