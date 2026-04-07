import { db } from "@/db";
import { serviceCategories, services } from "@/db/schema";
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
      .update(serviceCategories)
      .set({
        name: validatedData.name,
        slug,
        order: validatedData.order,
      })
      .where(eq(serviceCategories.id, parseInt(id)));

    return NextResponse.json({ message: "Kategori layanan berhasil diperbarui" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal memperbarui kategori layanan" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryIdValue = parseInt(id);

    // Check if category is used by services
    const inUse = await db.query.services.findFirst({
      where: eq(services.categoryId, categoryIdValue),
    });

    if (inUse) {
      return NextResponse.json({ 
        error: "Kategori sedang digunakan oleh layanan lain dan tidak dapat dihapus." 
      }, { status: 400 });
    }

    await db
      .delete(serviceCategories)
      .where(eq(serviceCategories.id, categoryIdValue));

    return NextResponse.json({ message: "Kategori layanan berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus kategori layanan" }, { status: 500 });
  }
}
