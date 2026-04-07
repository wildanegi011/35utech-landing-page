import { db } from "@/db";
import { achievements } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AchievementDetailClient from "./achievement-detail-client";

export default async function AchievementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const achievementId = parseInt(id);
  if (isNaN(achievementId)) notFound();

  const achievement = await db.query.achievements.findFirst({
    where: eq(achievements.id, achievementId),
    with: {
      category: true,
      gallery: true,
    },
  });

  if (!achievement) notFound();

  return <AchievementDetailClient achievement={achievement} />;
}
