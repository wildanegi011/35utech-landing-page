import { NextResponse } from "next/server";
import { writeFile, mkdir, chmod } from "node:fs/promises";
import { join } from "node:path";
import crypto from "node:crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure directory exists with correct permissions
    const uploadDir = join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true, mode: 0o777 });

    try { await chmod(uploadDir, 0o644); } catch { }


    // Create a unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${fileExt}`;
    const path = join(uploadDir, fileName);

    await writeFile(path, buffer);
    const assetUrl = process.env.NEXT_PUBLIC_URL;
    const url = `${assetUrl}/uploads/${fileName}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Extract filename from URL (handle both relative and full URLs)
    const fileName = url.split("/").pop();
    if (!fileName) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const path = join(process.cwd(), "public/uploads", fileName);
    
    // Check if file exists and delete
    const { unlink, access } = await import("node:fs/promises");
    try {
      await access(path);
      await unlink(path);
    } catch (e) {
      console.warn("File not found or already deleted:", path);
      // We return success anyway because the goal is for the file to be gone
    }

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
