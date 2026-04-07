import { db } from "@/db";
import { siteConfigs } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const configSchema = z.object({
  configKey: z.string(),
  configValue: z.string().optional().nullable(),
});

const bulkUpdateSchema = z.array(configSchema);

export async function GET() {
  try {
    let configs = await db.query.siteConfigs.findMany({
      where: eq(siteConfigs.isActive, true),
      orderBy: (configs, { asc }) => asc(configs.id)
    });
    
    // Seed defaults if empty
    if (configs.length === 0) {
      const defaults = [
        { configKey: "siteName", configLabel: "Nama Situs", configValue: "35utech", configGroup: "Main", configType: "text" },
        { configKey: "siteDescription", configLabel: "Deskripsi Situs", configValue: "Merekayasa solusi digital berkinerja tinggi", configGroup: "Main", configType: "textarea" },
        { configKey: "logoUrl", configLabel: "Logo Platform", configValue: "", configGroup: "Main", configType: "image" },
        { configKey: "faviconUrl", configLabel: "Favicon Situs (ICO/PNG)", configValue: "", configGroup: "Main", configType: "image" },
        { configKey: "contactEmail", configLabel: "Email Kontak", configValue: "hello@35utech.com", configGroup: "Kontak", configType: "text" },
        { configKey: "contactPhone", configLabel: "Telepon", configValue: "+62 21 3500 3500", configGroup: "Kontak", configType: "text" },
        { configKey: "whatsappNumber", configLabel: "WhatsApp", configValue: "6281234567890", configGroup: "Kontak", configType: "text" },
        { configKey: "officeHours", configLabel: "Jam Operasional", configValue: "Senin - Jumat: 09:00 - 18:00", configGroup: "Kontak", configType: "text" },
        { configKey: "instagramUrl", configLabel: "Instagram URL", configValue: "", configGroup: "Media Sosial", configType: "text" },
        { configKey: "facebookUrl", configLabel: "Facebook URL", configValue: "", configGroup: "Media Sosial", configType: "text" },
        { configKey: "linkedinUrl", configLabel: "LinkedIn URL", configValue: "", configGroup: "Media Sosial", configType: "text" },
        { configKey: "footerText", configLabel: "Teks Footer", configValue: "© 2026 35utech. All rights reserved.", configGroup: "Tampilan", configType: "text" },
      ];
      
      await db.insert(siteConfigs).values(defaults);
      configs = await db.query.siteConfigs.findMany({
        where: eq(siteConfigs.isActive, true),
        orderBy: (configs, { asc }) => asc(configs.id)
      });
    }
    
    return NextResponse.json(configs);
  } catch (error) {
    console.error("GET Configs Error:", error);
    return NextResponse.json({ error: "Gagal mengambil konfigurasi" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const updates = bulkUpdateSchema.parse(body);

    // Bulk update using separate queries (Drizzle doesn't support bulk CASE updates easily yet)
    await db.transaction(async (tx) => {
      for (const update of updates) {
        await tx.update(siteConfigs)
          .set({ configValue: update.configValue })
          .where(eq(siteConfigs.configKey, update.configKey));
      }
    });

    revalidatePath("/");

    return NextResponse.json({ message: "Konfigurasi berhasil diperbarui" });
  } catch (error) {
    console.error("PATCH Configs Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Data tidak valid", details: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal memperbarui konfigurasi" }, { status: 500 });
  }
}
