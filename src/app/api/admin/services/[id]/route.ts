import { db } from "@/db";
import { services } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

const serviceUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
  categoryId: z.number().int().optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });

    const body = await req.json();
    const validatedData = serviceUpdateSchema.parse(body);

    await db.update(services).set(validatedData).where(eq(services.id, id));

    return NextResponse.json({ message: "Layanan berhasil diperbarui" });
  } catch (error) {
    console.error("PATCH Service Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Data tidak valid", details: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal memperbarui layanan" }, { status: 500 });
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

    await db.delete(services).where(eq(services.id, id));

    return NextResponse.json({ message: "Layanan berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Service Error:", error);
    return NextResponse.json({ error: "Gagal menghapus layanan" }, { status: 500 });
  }
}
