import { tool } from "ai";
import { z } from "zod";
import { db } from "@/lib/db";
import { resorts, userProfiles } from "@/lib/db/schema";
import { like, eq } from "drizzle-orm";

export const getResortDetails = tool({
  description:
    "Look up detailed information about a specific Maldives resort by name",
  parameters: z.object({
    name: z.string().describe("The resort name to search for"),
  }),
  execute: async ({ name }) => {
    const results = await db
      .select()
      .from(resorts)
      .where(like(resorts.name, `%${name}%`))
      .limit(3);

    if (!results.length) {
      return { found: false, message: `No resort found matching "${name}"` };
    }

    return {
      found: true,
      resorts: results.map((r) => ({
        name: r.name,
        atoll: r.atoll,
        island: r.island,
        starRating: r.starRating,
        priceRange: r.priceRange,
        description: r.description,
        highlights: r.highlights ? JSON.parse(r.highlights) : [],
        transferType: r.transferType,
        transferTimeMinutes: r.transferTimeMinutes,
        features: {
          allInclusive: !!r.hasAllInclusive,
          spa: !!r.hasSpa,
          diving: !!r.hasDiving,
          surfing: !!r.hasSurfing,
          kidsClub: !!r.hasKidsClub,
          overwaterVilla: !!r.hasOverwaterVilla,
          honeymoonFriendly: !!r.honeymoonFriendly,
          familyFriendly: !!r.familyFriendly,
        },
        websiteUrl: r.websiteUrl,
      })),
    };
  },
});

export const saveUserPreferences = tool({
  description:
    "Save travel preferences learned from conversation (e.g. travel style, interests)",
  parameters: z.object({
    userId: z.string().describe("The Clerk user ID"),
    travelStyle: z
      .string()
      .optional()
      .describe("E.g. adventure, relaxation, luxury, family"),
    interests: z
      .array(z.string())
      .optional()
      .describe("E.g. diving, spa, honeymoon, surfing"),
  }),
  execute: async ({ userId, travelStyle, interests }) => {
    await db
      .insert(userProfiles)
      .values({
        clerkUserId: userId,
        travelStyle: travelStyle ?? null,
        interests: interests ? JSON.stringify(interests) : null,
      })
      .onConflictDoUpdate({
        target: userProfiles.clerkUserId,
        set: {
          ...(travelStyle && { travelStyle }),
          ...(interests && { interests: JSON.stringify(interests) }),
          updatedAt: new Date().toISOString(),
        },
      });

    return { saved: true };
  },
});

export function getAllResortsSummary(
  resortRows: (typeof resorts.$inferSelect)[]
): string {
  if (!resortRows.length) return "No resorts currently in database.";

  return resortRows
    .map((r) => {
      const features: string[] = [];
      if (r.hasOverwaterVilla) features.push("overwater villas");
      if (r.hasDiving) features.push("diving");
      if (r.hasSpa) features.push("spa");
      if (r.hasSurfing) features.push("surfing");
      if (r.hasKidsClub) features.push("kids club");
      if (r.hasAllInclusive) features.push("all-inclusive");
      if (r.honeymoonFriendly) features.push("honeymoon-friendly");
      if (r.familyFriendly) features.push("family-friendly");

      return `- ${r.name} (${r.atoll}, ${r.starRating}★, ${r.priceRange}): ${r.description}. Features: ${features.join(", ")}. Transfer: ${r.transferType}. Highlights: ${r.highlights}`;
    })
    .join("\n");
}
