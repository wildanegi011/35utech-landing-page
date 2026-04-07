import { db } from "@/db";
import { services } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  image: z.string().min(1),
  categoryId: z.number().int(),
  isPublished: z.boolean().default(false),
});

export async function GET() {
  try {
    const data = await db.query.services.findMany({
      with: {
        category: true,
      },
      orderBy: [desc(services.id)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Services Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data layanan" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = serviceSchema.parse(body);

    const [inserted] = await db.insert(services).values(validatedData);
    
    return NextResponse.json({ 
      message: "Layanan berhasil dibuat", 
      id: inserted.insertId 
    });
  } catch (error) {
    console.error("POST Service Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Data tidak valid", details: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal membuat layanan" }, { status: 500 });
  }
}
