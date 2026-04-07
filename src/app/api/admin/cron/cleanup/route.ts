import { db } from "@/db";
import { 
  projects, 
  projectGalleries, 
  services, 
  achievements,
  availableTechStacks
} from "@/db/schema";
import { NextResponse } from "next/server";
import { readdir, unlink, access } from "node:fs/promises";
import { join } from "node:path";

export async function POST(req: Request) {
  try {
    // 1. Security Check
    const authHeader = req.headers.get("authorization");
    const secret = process.env.CRON_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch all image URLs from database
    const [
      allProjects,
      allGalleries,
      allServices,
      allAchievements,
      allTechStacks
    ] = await Promise.all([
      db.select({ image: projects.image }).from(projects),
      db.select({ image: projectGalleries.imageUrl }).from(projectGalleries),
      db.select({ image: services.image }).from(services),
      db.select({ image: achievements.image }).from(achievements),
      db.select({ image: availableTechStacks.icon }).from(availableTechStacks)
    ]);

    // 3. Extract unique filenames from URLs
    const usedFiles = new Set<string>();
    
    const extractFile = (url: string | null) => {
      if (!url || !url.includes("/uploads/")) return;
      const fileName = url.split("/").pop();
      if (fileName) usedFiles.add(fileName);
    };

    allProjects.forEach(p => extractFile(p.image));
    allGalleries.forEach(g => extractFile(g.image));
    allServices.forEach(s => extractFile(s.image));
    allAchievements.forEach(a => extractFile(a.image));
    allTechStacks.forEach(t => extractFile(t.image));

    // 4. Scan filesystem (public/uploads)
    const uploadsDir = join(process.cwd(), "public/uploads");
    
    // Ensure directory exists
    try {
      await access(uploadsDir);
    } catch {
      return NextResponse.json({ message: "Uploads directory not found. Nothing to clean." });
    }

    const filesOnDisk = await readdir(uploadsDir);
    
    // 5. Identify and Delete Orphans
    const deletedFiles: string[] = [];
    const errors: string[] = [];

    for (const file of filesOnDisk) {
      // Avoid deleting hidden files like .gitkeep or .DS_Store
      if (file.startsWith(".")) continue;

      if (!usedFiles.has(file)) {
        try {
          await unlink(join(uploadsDir, file));
          deletedFiles.push(file);
        } catch (err) {
          errors.push(`Failed to delete ${file}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
    }

    return NextResponse.json({
      message: "Cleanup completed successfully",
      stats: {
        totalOnDatabase: usedFiles.size,
        totalOnDisk: filesOnDisk.length,
        deletedCount: deletedFiles.length,
        deleted: deletedFiles,
        errors: errors.length > 0 ? errors : undefined
      }
    });

  } catch (error) {
    console.error("CRON Cleanup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
