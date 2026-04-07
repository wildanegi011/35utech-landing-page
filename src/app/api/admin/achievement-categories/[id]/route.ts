import { db } from "@/db";
import { achievementCategories, achievements } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  order: z.number().int().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = categorySchema.parse(body);

    const slug = validatedData.slug || slugify(validatedData.name);

    await db
      .update(achievementCategories)
      .set({
        name: validatedData.name,
        slug,
        order: validatedData.order,
      })
      .where(eq(achievementCategories.id, parseInt(id)));

    return NextResponse.json({ message: "Kategori berhasil diperbarui" });
  } catch (error) {
    console.error("PATCH Achievement Category Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal memperbarui kategori" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryIdValue = parseInt(id);

    // Check if category is used by achievements
    const inUse = await db.query.achievements.findFirst({
      where: eq(achievements.categoryId, categoryIdValue),
    });

    if (inUse) {
      return NextResponse.json({ 
        error: "Kategori sedang digunakan oleh prestasi lain dan tidak dapat dihapus." 
      }, { status: 400 });
    }

    await db
      .delete(achievementCategories)
      .where(eq(achievementCategories.id, categoryIdValue));

    return NextResponse.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Achievement Category Error:", error);
    return NextResponse.json({ error: "Gagal menghapus kategori" }, { status: 500 });
  }
}
