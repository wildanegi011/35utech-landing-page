import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import PortfolioDetailClient from "./portfolio-detail-client";

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, slug),
    with: {
      category: true,
      status: true,
      gallery: true,
      techStack: true,
      features: true,
    },
  });

  if (!project) notFound();

  return <PortfolioDetailClient project={project} />;
}
