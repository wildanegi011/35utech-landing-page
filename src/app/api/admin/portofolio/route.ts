import { db } from "@/db";
import { 
  projects, 
  projectGalleries, 
  projectTechStack, 
  projectFeatures,
  projectCategories
} from "@/db/schema";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  challenge: z.string().default(""),
  solution: z.string().default(""),
  impact: z.string().default(""),
  categoryId: z.number().int(),
  image: z.string().url(),
  year: z.string().length(4),
  client: z.string().min(1),
  statusId: z.number().int(),
  link: z.string().url().optional().or(z.literal("")),
  aspectRatio: z.string().default("aspect-video"),
  gallery: z.array(z.string()).default([]),
  techStack: z.array(z.object({ name: z.string(), icon: z.string().optional() })).default([]),
  features: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
});

export async function GET() {
  try {
    const data = await db.query.projects.findMany({
      with: {
        category: true,
        status: true,
        gallery: {
          orderBy: (gallery, { asc }) => [asc(gallery.order)],
        },
        techStack: true,
        features: true,
      },
      orderBy: [desc(projects.id)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Projects Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data proyek" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = projectSchema.parse(body);

    const { gallery, techStack, features, ...projectData } = validatedData;

    // Generate slug from title
    const finalProjectData = {
      ...projectData,
      slug: projectData.slug || slugify(projectData.title),
    };

    // Use a transaction for atomic insert
    const resultId = await db.transaction(async (tx) => {
      const [inserted] = await tx.insert(projects).values(finalProjectData as any);
      const projectId = inserted.insertId;

      if (gallery.length > 0) {
        await tx.insert(projectGalleries).values(
          gallery.map((url, index) => ({ projectId, imageUrl: url, order: index }))
        );
      }

      if (techStack.length > 0) {
        await tx.insert(projectTechStack).values(
          techStack.map(tech => ({ projectId, name: tech.name, icon: tech.icon }))
        );
      }

      if (features.length > 0) {
        await tx.insert(projectFeatures).values(
          features.map(name => ({ projectId, name }))
        );
      }

      return projectId;
    });
    
    return NextResponse.json({ 
      message: "Proyek berhasil dibuat", 
      id: resultId 
    });
  } catch (error) {
    console.error("POST Project Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Data tidak valid", details: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal membuat proyek" }, { status: 500 });
  }
}
