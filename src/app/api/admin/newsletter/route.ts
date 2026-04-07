import { db } from "@/db";
import { newsletters } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const subscribers = await db.query.newsletters.findMany({
      orderBy: [desc(newsletters.createdAt)],
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("GET Newsletters Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil daftar newsletter" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });
    }

    await db.delete(newsletters).where(eq(newsletters.id, parseInt(id)));

    return NextResponse.json({ message: "Berhasil menghapus email dari newsletter" });
  } catch (error) {
    console.error("DELETE Newsletter Error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus pelanggan" },
      { status: 500 }
    );
  }
}
