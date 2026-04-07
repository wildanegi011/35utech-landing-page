import { db } from "@/db";
import { 
  projects, 
  projectGalleries, 
  projectTechStack, 
  projectFeatures 
} from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { slugify } from "@/lib/utils";
import { unlink, access } from "node:fs/promises";
import { join } from "node:path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });

    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
      with: {
        category: true,
        status: true,
        gallery: {
          orderBy: (gallery, { asc }) => [asc(gallery.order)]
        },
        techStack: true,
        features: true,
      }
    });

    if (!project) return NextResponse.json({ error: "Proyek tidak ditemukan" }, { status: 404 });

    // Transform to match the expected frontend Project type
    const transformed = {
      ...project,
      category: project.category?.name || "Uncategorized",
      status: project.status?.name || "Unknown",
      gallery: project.gallery?.map(g => g.imageUrl) || [],
      techStack: project.techStack || [],
      features: project.features?.map(f => f.name) || [],
    };

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("GET Project Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data proyek" }, { status: 500 });
  }
}

const projectUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  longDescription: z.string().min(1).optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  impact: z.string().optional(),
  categoryId: z.number().int().optional(),
  image: z.string().url().optional(),
  year: z.string().length(4).optional(),
  client: z.string().min(1).optional(),
  statusId: z.number().int().optional(),
  link: z.string().url().optional().or(z.literal("")),
  aspectRatio: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  techStack: z.array(z.object({ name: z.string(), icon: z.string().optional() })).optional(),
  features: z.array(z.string()).optional(),
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
    const validatedData = projectUpdateSchema.parse(body);

    const { gallery, techStack, features, ...projectData } = validatedData;

    await db.transaction(async (tx) => {
      // 1. Update Core Data
      if (Object.keys(projectData).length > 0) {
        const updateData: any = { ...projectData };
        if (projectData.title) {
          updateData.slug = slugify(projectData.title);
        }
        await tx.update(projects).set(updateData).where(eq(projects.id, id));
      }

      // 2. Update Gallery (Clear and Re-insert for simplicity)
      if (gallery) {
        await tx.delete(projectGalleries).where(eq(projectGalleries.projectId, id));
        if (gallery.length > 0) {
          await tx.insert(projectGalleries).values(
            gallery.map((url, index) => ({ projectId: id, imageUrl: url, order: index }))
          );
        }
      }

      // 3. Update Tech Stack
      if (techStack) {
        await tx.delete(projectTechStack).where(eq(projectTechStack.projectId, id));
        if (techStack.length > 0) {
          await tx.insert(projectTechStack).values(
            techStack.map(tech => ({ projectId: id, name: tech.name, icon: tech.icon }))
          );
        }
      }

      // 4. Update Features
      if (features) {
        await tx.delete(projectFeatures).where(eq(projectFeatures.projectId, id));
        if (features.length > 0) {
          await tx.insert(projectFeatures).values(
            features.map(name => ({ projectId: id, name }))
          );
        }
      }
    });

    return NextResponse.json({ message: "Proyek berhasil diperbarui" });
  } catch (error) {
    console.error("PATCH Project Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Data tidak valid", details: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal memperbarui proyek" }, { status: 500 });
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

    // 1. Fetch images before deletion for cleanup
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
      with: { gallery: true }
    });

    if (!project) return NextResponse.json({ error: "Proyek tidak ditemukan" }, { status: 404 });

    // 2. Perform DB deletion
    await db.transaction(async (tx) => {
      await tx.delete(projectGalleries).where(eq(projectGalleries.projectId, id));
      await tx.delete(projectTechStack).where(eq(projectTechStack.projectId, id));
      await tx.delete(projectFeatures).where(eq(projectFeatures.projectId, id));
      await tx.delete(projects).where(eq(projects.id, id));
    });

    // 3. Post-deletion file cleanup
    const imagesToDelete = [
      project.image,
      ...(project.gallery?.map(g => g.imageUrl) || [])
    ].filter(Boolean);

    for (const url of imagesToDelete) {
      if (!url.includes("/uploads/")) continue;
      const fileName = url.split("/").pop();
      if (!fileName) continue;
      
      const path = join(process.cwd(), "public/uploads", fileName);
      try {
        await access(path);
        await unlink(path);
      } catch (err) {
        console.warn(`Cleanup failed for ${path}:`, err);
      }
    }

    return NextResponse.json({ message: "Proyek berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Project Error:", error);
    return NextResponse.json({ error: "Gagal menghapus proyek" }, { status: 500 });
  }
}
