import { db } from "@/db";
import { newsletters } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";

const newsletterSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = newsletterSchema.parse(body);

    // Check if email already exists
    const existing = await db.query.newsletters.findFirst({
      where: eq(newsletters.email, email.toLowerCase()),
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar sebagai pelanggan" },
        { status: 400 }
      );
    }

    // Insert new subscription
    await db.insert(newsletters).values({
      email: email.toLowerCase(),
    });

    return NextResponse.json(
      { message: "Terima kasih! Anda berhasil berlangganan newsletter kami" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Terjadi kesalahan sistem saat mendaftar" },
      { status: 500 }
    );
  }
}
