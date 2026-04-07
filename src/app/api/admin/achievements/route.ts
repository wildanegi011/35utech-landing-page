import { db } from "@/db";
import { achievements, achievementGalleries } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const achievementSchema = z.object({
  title: z.string().min(1),
  year: z.string().length(4),
  description: z.string().min(1),
  categoryId: z.number().int(),
  scope: z.string().min(1),
  image: z.string().min(1),
  icon: z.string().optional().or(z.literal("")),
  isPublished: z.boolean().default(false),
  gallery: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    const data = await db.query.achievements.findMany({
      with: {
        category: true,
        gallery: {
          orderBy: (gallery, { asc }) => [asc(gallery.order)],
        },
      },
      orderBy: [desc(achievements.id)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Achievements Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data prestasi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = achievementSchema.parse(body);

    const { gallery, ...achievementData } = validatedData;
    const [inserted] = await db.insert(achievements).values(achievementData);
    
    if (gallery && gallery.length > 0) {
      await db.insert(achievementGalleries).values(
        gallery.map((url: string, index: number) => ({
          achievementId: inserted.insertId,
          imageUrl: url,
          order: index,
        }))
      );
    }
    
    return NextResponse.json({ 
      message: "Prestasi berhasil dibuat", 
      id: inserted.insertId 
    });
  } catch (error) {
    console.error("POST Achievement Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Data tidak valid", details: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal membuat prestasi" }, { status: 500 });
  }
}
