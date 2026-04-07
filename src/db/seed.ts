import { db } from "./index";
import { projectCategories, serviceCategories, availableTechStacks } from "./schema";

async function seed() {
  console.log("🌱 Seeding categories...");

  try {
    const pCats = [
      { name: "Sistem Informasi", slug: "sistem-informasi" },
      { name: "Website", slug: "website" },
      { name: "Mobile App", slug: "mobile-app" },
      { name: "Aplikasi Kasir", slug: "aplikasi-kasir" },
    ];

    for (const cat of pCats) {
      await db.insert(projectCategories).values(cat).onDuplicateKeyUpdate({ set: { name: cat.name } });
    }
    console.log("✅ Seeded project categories");

    const sCats = [
      { name: "Development", slug: "development" },
      { name: "Design", slug: "design" },
      { name: "Infrastructure", slug: "infrastructure" },
    ];

    for (const cat of sCats) {
      await db.insert(serviceCategories).values(cat).onDuplicateKeyUpdate({ set: { name: cat.name } });
    }
    console.log("✅ Seeded service categories");
    
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

    for (const stack of techStacks) {
      await db.insert(availableTechStacks).values(stack).onDuplicateKeyUpdate({ set: { icon: stack.icon } });
    }
    console.log("✅ Seeded tech stack library");

    console.log("✨ Seeding completed!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seed();
