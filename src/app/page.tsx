import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import { db } from "@/db";
import { projects, services, achievements, projectCategories, achievementCategories, siteConfigs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const revalidate = 0;

export default async function Home() {
  // Fetch site settings
  const siteConfigsData = await db.query.siteConfigs.findMany({
    where: eq(siteConfigs.isActive, true),
  });

  // Fetch categories for filters
  const allProjectCategories = await db.query.projectCategories.findMany({
    orderBy: (categories, { asc }) => asc(categories.order)
  });
  const allAchievementCategories = await db.query.achievementCategories.findMany({
    orderBy: (categories, { asc }) => asc(categories.order)
  });

  // Fetch published content for sections
  const publishedProjects = await db.query.projects.findMany({
    where: eq(projects.isPublished, true),
    with: {
      category: true,
      status: true,
    },
    orderBy: [desc(projects.year), desc(projects.id)]
  });

  const publishedServices = await db.query.services.findMany({
    where: eq(services.isPublished, true),
    orderBy: [desc(services.id)]
  });

  const publishedAchievements = await db.query.achievements.findMany({
    where: eq(achievements.isPublished, true),
    with: {
      category: true,
    },
    orderBy: [desc(achievements.year), desc(achievements.id)]
  });

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar configs={siteConfigsData} />
      <main className="grow">
        <Hero />
        <Services services={publishedServices} />
        <Portfolio projects={publishedProjects} categories={allProjectCategories} />
        <Achievements achievements={publishedAchievements} categories={allAchievementCategories} />
        <Contact configs={siteConfigsData} />
      </main>
      <Footer configs={siteConfigsData} />
    </div>
  );
}
