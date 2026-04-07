import { db } from "@/db";
import { achievements, achievementGalleries } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

const achievementUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  year: z.string().length(4).optional(),
  description: z.string().min(1).optional(),
  categoryId: z.number().int().optional(),
  scope: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
  icon: z.string().optional().or(z.literal("")),
  isPublished: z.boolean().optional(),
  gallery: z.array(z.string()).optional(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });

    const achievement = await db.query.achievements.findFirst({
      where: eq(achievements.id, id),
      with: {
        category: true,
        gallery: {
          orderBy: (gallery, { asc }) => [asc(gallery.order)],
        },
      },
    });

    if (!achievement) return NextResponse.json({ error: "Prestasi tidak ditemukan" }, { status: 404 });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error("GET Achievement Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data prestasi" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });

    const body = await req.json();
    const validatedData = achievementUpdateSchema.parse(body);

    const { gallery, ...achievementData } = validatedData;

    await db.update(achievements).set(achievementData).where(eq(achievements.id, id));

    if (gallery) {
      // Sync gallery
      await db.delete(achievementGalleries).where(eq(achievementGalleries.achievementId, id));

      if (gallery.length > 0) {
        await db.insert(achievementGalleries).values(
          gallery.map((url, index) => ({
            achievementId: id,
            imageUrl: url,
            order: index,
          }))
        );
      }
    }

    return NextResponse.json({ message: "Prestasi berhasil diperbarui" });
  } catch (error) {
    console.error("PATCH Achievement Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Data tidak valid", details: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal memperbarui prestasi" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });

    await db.delete(achievementGalleries).where(eq(achievementGalleries.achievementId, id));
    await db.delete(achievements).where(eq(achievements.id, id));

    return NextResponse.json({ message: "Prestasi berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Achievement Error:", error);
    return NextResponse.json({ error: "Gagal menghapus prestasi" }, { status: 500 });
  }
}
