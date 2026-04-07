import { availableTechStacks, serviceCategories } from "@/db/schema";

const { db } = require("../src/db");
const {
  projects,
  projectCategories,
  projectStatuses,
  achievements,
  achievementCategories,
  projectTechStack,
  projectFeatures,
  users,
  services
} = require("../src/db/schema");
const { eq } = require("drizzle-orm");
const bcrypt = require("bcryptjs");

async function seed() {
  console.log("\n🌱 Seeding database...");

  // 1. Ensure Categories & Statuses
  const pCatData = [
    { name: "Website", slug: "website", order: 1 },
    { name: "Sistem Informasi", slug: "sistem-informasi", order: 2 },
    { name: "Aplikasi Kasir", slug: "aplikasi-kasir", order: 3 },
  ];

  const pStatData = [
    { name: "Selesai", slug: "selesai" },
    { name: "Sedang Berjalan", slug: "sedang-berjalan" },
    { name: "Pemeliharaan", slug: "pemeliharaan" },
  ];

  const aCatData = [
    { name: "Award", slug: "award", order: 1 },
    { name: "Recognition", slug: "recognition", order: 2 },
    { name: "Certification", slug: "certification", order: 3 },
    { name: "Excellence", slug: "excellence", order: 4 },
  ];

  const sCats = [
    { name: "Development", slug: "development" },
    { name: "Design", slug: "design" },
    { name: "Business", slug: "business" },
  ];


  const techStacks = [
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
  ];


  console.log("📦 Syncing categories and statuses...");

  // Use try/catch for conflict handling
  for (const cat of pCatData) {
    try { await db.insert(projectCategories).values(cat); } catch (e) { }
  }

  for (const stat of pStatData) {
    try { await db.insert(projectStatuses).values(stat); } catch (e) { }
  }

  for (const cat of aCatData) {
    try { await db.insert(achievementCategories).values(cat); } catch (e) { }
  }

  for (const cat of sCats) {
    await db.insert(serviceCategories).values(cat).onDuplicateKeyUpdate({ set: { name: cat.name } });
  }

  for (const stack of techStacks) {
    await db.insert(availableTechStacks).values(stack).onDuplicateKeyUpdate({ set: { icon: stack.icon } });
  }
  const allPCats = await db.query.projectCategories.findMany();
  const allPStats = await db.query.projectStatuses.findMany();
  const allACats = await db.query.achievementCategories.findMany();

  // 2. Seed 50 Projects
  console.log("🚀 Seeding 50 Portfolio Items...");
  for (let i = 1; i <= 50; i++) {
    const cat = allPCats[Math.floor(Math.random() * allPCats.length)];
    const stat = allPStats[Math.floor(Math.random() * allPStats.length)];
    const year = (2020 + Math.floor(Math.random() * 6)).toString();
    const title = `Project ${cat.name} ${i}`;
    const slug = `${cat.slug}-project-${i}-${Math.random().toString(36).substring(7)}`;

    try {
      const result = await db.insert(projects).values({
        title,
        slug,
        description: `Deskripsi singkat untuk proyek ${title}. Memberikan solusi digital inovatif untuk kebutuhan bisnis modern.`,
        longDescription: `Deskripsi lengkap mencakup detail teknis dan alur kerja proyek ${title}. Proyek ini dirancang untuk meningkatkan efisiensi operasional bagi klien melalui fitur-fitur canggih.`,
        challenge: "Tantangan utama mencakup integrasi sistem legacy dan skalabilitas data besar.",
        solution: "Kami mengimplementasikan arsitektur microservices dan optimasi database untuk performa tinggi.",
        impact: "Meningkatkan efisiensi kerja sebesar 40% dan mengurangi biaya operasional bulanan.",
        categoryId: cat.id,
        statusId: stat.id,
        year: year,
        client: `Client Company ${i}`,
        image: `https://images.unsplash.com/photo-${1500000000000 + (i % 1000)}?auto=format&fit=crop&q=80&w=1200`,
        isPublished: true,
        link: "https://35utech.com",
        aspectRatio: i % 2 === 0 ? "aspect-video" : "aspect-square",
      });

      const projectId = result[0].insertId;

      // Add Tech Stacks
      await db.insert(projectTechStack).values([
        { projectId: projectId, name: "Next.js" },
        { projectId: projectId, name: "Tailwind CSS" },
        { projectId: projectId, name: "TypeScript" },
      ]);

      // Add Features
      await db.insert(projectFeatures).values([
        { projectId: projectId, name: "Dashboard Analytics" },
        { projectId: projectId, name: "Real-time Notifications" },
        { projectId: projectId, name: "Multi-tenant Support" },
      ]);
    } catch (e: any) {
      console.warn(`Skipping project ${i} due to error:`, e.message);
    }
  }

  // 3. Seed 10 Achievements
  console.log("🏆 Seeding 10 Achievement Items...");
  for (let i = 1; i <= 10; i++) {
    const cat = allACats[Math.floor(Math.random() * allACats.length)];
    const year = (2020 + Math.floor(Math.random() * 6)).toString();
    const scope = i % 2 === 0 ? "Nasional" : "Lokal";

    try {
      await db.insert(achievements).values({
        title: `${cat.name} Tingkat ${scope} #${i}`,
        description: `Pencapaian luar biasa dalam kategori ${cat.name} yang mengakui dedikasi kami terhadap inovasi teknologi unggulan.`,
        year: year,
        scope: scope,
        categoryId: cat.id,
        image: `https://images.unsplash.com/photo-${1600000000000 + (i % 1000)}?auto=format&fit=crop&q=80&w=1200`,
        isPublished: true,
        icon: "Award",
      });
    } catch (e: any) {
      console.warn(`Skipping achievement ${i} due to error:`, e.message);
    }
  }

  // 4. Seed 3 Services for each category
  console.log("🛠 Seeding Services...");
  const allSCats = await db.query.serviceCategories.findMany();
  const serviceIcons = ["Code2", "Zap", "Shield"];

  for (const cat of allSCats) {
    for (let i = 1; i <= 3; i++) {
      try {
        await db.insert(services).values({
          title: `${cat.name} Portfolio ${i}`,
          description: `Solusi strategis untuk pemeliharaan dan pengembangan sistem ${cat.name} dalam skala perusahaan.`,
          icon: serviceIcons[Math.floor(Math.random() * serviceIcons.length)],
          image: `https://images.unsplash.com/photo-${1550751827 + (i * 100)}?auto=format&fit=crop&q=80&w=1200`,
          categoryId: cat.id,
          isPublished: true,
        });
      } catch (e: any) {
        console.warn(`Skipping service for ${cat.name} due to error:`, e.message);
      }
    }
  }

  // 5. Seed Default Admin
  console.log("👤 Syncing admin user...");
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.insert(users).values({
      name: "Super Admin",
      email: "admin@35utech.com",
      password: hashedPassword,
      role: "admin",
    }).onDuplicateKeyUpdate({
      set: {
        name: "Super Admin",
        password: hashedPassword,
      }
    });
  } catch (e: any) {
    console.error("❌ Failed to sync admin user:", e.message);
  }

  console.log("\n✨ Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("\n❌ Seeding failed:", err);
  process.exit(1);
});
