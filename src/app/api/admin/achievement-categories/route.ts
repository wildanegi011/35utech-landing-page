import { db } from "@/db";
import { achievementCategories } from "@/db/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  order: z.number().int().optional(),
});

export async function GET() {
  try {
    const data = await db.query.achievementCategories.findMany({
      orderBy: [asc(achievementCategories.order)],
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil kategori" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = categorySchema.parse(body);

    const slug = validatedData.slug || validatedData.name.toLowerCase().replace(/ /g, "-");

    const [inserted] = await db.insert(achievementCategories).values({
      name: validatedData.name,
      slug,
      order: validatedData.order || 0,
    });

    return NextResponse.json({ 
      message: "Kategori berhasil dibuat", 
      id: inserted.insertId 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal membuat kategori" }, { status: 500 });
  }
}
