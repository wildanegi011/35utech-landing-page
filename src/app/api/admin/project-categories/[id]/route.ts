import { db } from "@/db";
import { projectCategories, projects } from "@/db/schema";
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
      .update(projectCategories)
      .set({
        name: validatedData.name,
        slug,
        order: validatedData.order,
      })
      .where(eq(projectCategories.id, parseInt(id)));

    return NextResponse.json({ message: "Kategori proyek berhasil diperbarui" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal memperbarui kategori proyek" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryIdValue = parseInt(id);

    // Check if category is used by projects
    const inUse = await db.query.projects.findFirst({
      where: eq(projects.categoryId, categoryIdValue),
    });

    if (inUse) {
      return NextResponse.json({ 
        error: "Kategori sedang digunakan oleh proyek lain dan tidak dapat dihapus." 
      }, { status: 400 });
    }

    await db
      .delete(projectCategories)
      .where(eq(projectCategories.id, categoryIdValue));

    return NextResponse.json({ message: "Kategori proyek berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus kategori proyek" }, { status: 500 });
  }
}
